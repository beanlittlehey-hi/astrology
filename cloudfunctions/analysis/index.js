const cloud = require("wx-server-sdk")
const https = require("https")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro"
const DEFAULT_API_URL = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions"
const DAILY_BUDGET_CNY = Number(process.env.DEEPSEEK_DAILY_BUDGET_CNY || "1")
const USD_TO_CNY = Number(process.env.DEEPSEEK_USD_TO_CNY || "7.3")
const MAX_TOKENS = Number(process.env.DEEPSEEK_MAX_TOKENS || "1000")
const THINKING_MODE = process.env.DEEPSEEK_THINKING || "disabled"
const REASONING_EFFORT = process.env.DEEPSEEK_REASONING_EFFORT || "high"
const REASONING_TOKEN_ALLOWANCE = THINKING_MODE === "enabled"
  ? Number(process.env.DEEPSEEK_REASONING_TOKEN_ALLOWANCE || "1500")
  : 0
const USAGE_COLLECTION = "ai_usage_daily"
const PRICE_USD_PER_1M = {
  cacheHitInput: Number(process.env.DEEPSEEK_PRICE_HIT_INPUT_USD_PER_1M || "0.003625"),
  cacheMissInput: Number(process.env.DEEPSEEK_PRICE_MISS_INPUT_USD_PER_1M || "0.435"),
  output: Number(process.env.DEEPSEEK_PRICE_OUTPUT_USD_PER_1M || "0.87")
}

const db = cloud.database()
const dbCommand = db.command

function safeCards(cards = []) {
  return cards.map((card) => ({
    position: card.position || "",
    name: card.name || "",
    orientation: card.orientation || (card.reversed ? "逆位" : "正位"),
    keywords: card.keywordText || (card.keywords || []).join(" / "),
    meaning: card.meaning || "",
    upright: card.upright || "",
    reversed: card.reversed || ""
  }))
}

function stripCodeFence(text = "") {
  return String(text)
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim()
}

function parseJson(text) {
  const cleaned = stripCodeFence(text)
  try {
    return JSON.parse(cleaned)
  } catch (error) {
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (!match) throw error
    return JSON.parse(match[0])
  }
}

function cnyDayKey(date = new Date()) {
  return new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

async function ensureCollection(name) {
  if (!db.createCollection) return
  try {
    await db.createCollection(name)
  } catch (error) {
    const message = error && (error.errMsg || error.message) ? error.errMsg || error.message : ""
    if (!/exist|already/i.test(message)) {
      console.warn(`ensure collection ${name} failed`, error)
    }
  }
}

function estimateTokens(text = "") {
  return Math.max(1, Math.ceil(String(text).length / 1.5))
}

function calculateCostCny(usage = {}) {
  const hitTokens = Number(usage.prompt_cache_hit_tokens || 0)
  const promptTokens = Number(usage.prompt_tokens || 0)
  const missTokens = Number(
    usage.prompt_cache_miss_tokens != null
      ? usage.prompt_cache_miss_tokens
      : Math.max(promptTokens - hitTokens, 0)
  )
  const completionTokens = Number(usage.completion_tokens || 0)
  const usd =
    (hitTokens / 1000000) * PRICE_USD_PER_1M.cacheHitInput +
    (missTokens / 1000000) * PRICE_USD_PER_1M.cacheMissInput +
    (completionTokens / 1000000) * PRICE_USD_PER_1M.output
  return {
    cny: usd * USD_TO_CNY,
    usd,
    hitTokens,
    missTokens,
    completionTokens,
    promptTokens
  }
}

function estimateCallCostCny(prompt) {
  return calculateCostCny({
    prompt_cache_miss_tokens: estimateTokens(`${systemPrompt()}\n${prompt}`),
    completion_tokens: MAX_TOKENS + REASONING_TOKEN_ALLOWANCE
  }).cny
}

async function getUsageRecord(dayKey) {
  await ensureCollection(USAGE_COLLECTION)
  const result = await db.collection(USAGE_COLLECTION).where({ dayKey }).limit(1).get()
  return result.data && result.data[0] ? result.data[0] : null
}

async function assertBudgetAvailable(prompt) {
  if (!Number.isFinite(DAILY_BUDGET_CNY) || DAILY_BUDGET_CNY <= 0) return
  const dayKey = cnyDayKey()
  const record = await getUsageRecord(dayKey)
  const spentCny = Number(record && record.spentCny ? record.spentCny : 0)
  const estimatedCny = estimateCallCostCny(prompt)
  if (spentCny + estimatedCny > DAILY_BUDGET_CNY) {
    const error = new Error(
      `Daily DeepSeek budget exceeded: spent ${spentCny.toFixed(4)} CNY, estimated ${estimatedCny.toFixed(4)} CNY, budget ${DAILY_BUDGET_CNY} CNY`
    )
    error.code = "DAILY_BUDGET_EXCEEDED"
    throw error
  }
}

async function recordUsage(usage = {}, action = "") {
  if (!Number.isFinite(DAILY_BUDGET_CNY) || DAILY_BUDGET_CNY <= 0) return
  const dayKey = cnyDayKey()
  const cost = calculateCostCny(usage)
  const now = new Date()
  const existing = await getUsageRecord(dayKey)
  const data = {
    spentCny: dbCommand.inc(cost.cny),
    spentUsd: dbCommand.inc(cost.usd),
    calls: dbCommand.inc(1),
    promptTokens: dbCommand.inc(cost.promptTokens),
    promptCacheHitTokens: dbCommand.inc(cost.hitTokens),
    promptCacheMissTokens: dbCommand.inc(cost.missTokens),
    completionTokens: dbCommand.inc(cost.completionTokens),
    updatedAt: now,
    lastAction: action,
    budgetCny: DAILY_BUDGET_CNY,
    usdToCny: USD_TO_CNY,
    priceUsdPer1M: PRICE_USD_PER_1M
  }
  if (existing) {
    await db.collection(USAGE_COLLECTION).doc(existing._id).update({ data })
    return
  }
  await db.collection(USAGE_COLLECTION).add({
    data: {
      dayKey,
      spentCny: cost.cny,
      spentUsd: cost.usd,
      calls: 1,
      promptTokens: cost.promptTokens,
      promptCacheHitTokens: cost.hitTokens,
      promptCacheMissTokens: cost.missTokens,
      completionTokens: cost.completionTokens,
      createdAt: now,
      updatedAt: now,
      lastAction: action,
      budgetCny: DAILY_BUDGET_CNY,
      usdToCny: USD_TO_CNY,
      priceUsdPer1M: PRICE_USD_PER_1M
    }
  })
}

function normalizeReading(data = {}, fallback = {}) {
  const cards = fallback.cards || []
  const cardInsights = Array.isArray(data.cardInsights)
    ? data.cardInsights.map((item, index) => ({
        position: item.position || (cards[index] && cards[index].position) || `第 ${index + 1} 张`,
        title: item.title || `${item.position || "牌位"}：${cards[index] ? cards[index].name : ""}`,
        keywords: item.keywords || (cards[index] && cards[index].keywordText) || "",
        text: item.text || ""
      }))
    : []
  const emotionTags = Array.isArray(data.emotionTags) && data.emotionTags.length
    ? data.emotionTags.slice(0, 4)
    : ["观察", "犹豫"]

  return {
    title: data.title || fallback.title || "这组牌提醒你先看清当下",
    summary: data.summary || fallback.summary || "",
    cardInsights,
    combinationInsight: data.combinationInsight || fallback.combinationInsight || "",
    emotionTags,
    emotionText: data.emotionText || emotionTags.join("、"),
    mirror: data.mirror || fallback.mirror || "",
    action: data.action || fallback.action || "",
    writing: data.writing || fallback.writing || ""
  }
}

function normalizeDiaryEmotion(data = {}, fallback = {}) {
  const emotionTags = Array.isArray(data.emotionTags) && data.emotionTags.length
    ? data.emotionTags.slice(0, 4)
    : fallback.emotionTags || ["观察"]
  return {
    emotionTags,
    emotionText: data.emotionText || emotionTags.join("、"),
    summary: data.summary || fallback.summary || "",
    suggestion: data.suggestion || fallback.suggestion || "",
    userInputInsight: data.userInputInsight || ""
  }
}

function systemPrompt() {
  return [
    "你是一个温柔克制的塔罗与情绪记录助手。",
    "你的输出必须是严格 JSON，不要输出 Markdown、解释、代码块或额外文字。",
    "所有解释必须锚定用户输入的问题、牌位、牌名、正逆位和关键词。",
    "不要写必定、一定、绝对、复合保证、一定失败、购买转运等确定性或恐吓表达。",
    "内容仅用于娱乐陪伴和自我探索，不构成医疗、心理诊断、法律或投资建议。"
  ].join("\n")
}

function readingPrompt(payload = {}) {
  const cards = safeCards(payload.cards)
  return [
    "请基于以下用户问题、方向、牌阵和抽中的塔罗牌，生成一次结构化测算解读。",
    "重点：结论必须回应用户实际问题，不要套用固定模板。",
    "",
    `用户问题：${payload.question || "未填写"}`,
    `问题方向：${payload.sceneName || payload.sceneId || "综合"}`,
    `牌阵：${payload.spreadName || ""}`,
    `抽中卡牌：${JSON.stringify(cards, null, 2)}`,
    "",
    "请只返回 JSON，字段如下：",
    JSON.stringify({
      title: "结果页标题",
      summary: "整体解读，必须回应用户问题",
      cardInsights: [
        {
          position: "牌位",
          title: "牌位：牌名正/逆位",
          keywords: "关键词",
          text: "这张牌如何回应用户问题"
        }
      ],
      combinationInsight: "多张牌之间的组合提示",
      emotionTags: ["焦虑", "期待"],
      emotionText: "焦虑、期待",
      mirror: "情绪识别说明",
      action: "24 小时行动建议",
      writing: "日记回看提示"
    })
  ].join("\n")
}

function diaryPrompt(payload = {}) {
  const session = payload.session || {}
  return [
    "请结合用户补充的情绪日记、塔罗结论和抽中卡牌，做情绪关联分析。",
    "重点：情绪标签和摘要必须同时参考用户输入文本与塔罗解读，不要只复制已有标签。",
    "",
    `用户补充文本：${payload.userInput || "未填写"}`,
    `用户问题：${session.question || ""}`,
    `塔罗标题：${session.title || ""}`,
    `塔罗整体解读：${session.summary || ""}`,
    `塔罗情绪镜像：${session.mirror || ""}`,
    `抽中卡牌：${JSON.stringify(safeCards(session.cards || []), null, 2)}`,
    "",
    "请只返回 JSON，字段如下：",
    JSON.stringify({
      emotionTags: ["焦虑", "内耗"],
      emotionText: "焦虑、内耗",
      summary: "系统摘要",
      suggestion: "下次回来可以看",
      userInputInsight: "用户补充文本里的情绪线索"
    })
  ].join("\n")
}

function requestDeepSeek(body) {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is missing")
  }

  const url = new URL(DEFAULT_API_URL)
  const payload = JSON.stringify(body)

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method: "POST",
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 60000
      },
      (res) => {
        let data = ""
        res.setEncoding("utf8")
        res.on("data", (chunk) => {
          data += chunk
        })
        res.on("end", () => {
          let parsed = null
          try {
            parsed = data ? JSON.parse(data) : null
          } catch (error) {
            reject(new Error(`DeepSeek response is not JSON: ${data.slice(0, 200)}`))
            return
          }
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`DeepSeek API failed: ${res.statusCode} ${data.slice(0, 300)}`))
            return
          }
          resolve(parsed)
        })
      }
    )

    req.on("timeout", () => {
      req.destroy(new Error("DeepSeek API timeout"))
    })
    req.on("error", reject)
    req.write(payload)
    req.end()
  })
}

async function generateJson(prompt, action) {
  await assertBudgetAvailable(prompt)
  const requestBody = {
    model: DEFAULT_MODEL,
    messages: [
      { role: "system", content: systemPrompt() },
      { role: "user", content: prompt }
    ],
    max_tokens: MAX_TOKENS,
    response_format: { type: "json_object" }
  }

  if (THINKING_MODE === "enabled" || THINKING_MODE === "disabled") {
    requestBody.thinking = { type: THINKING_MODE }
  }
  if (THINKING_MODE === "enabled") {
    requestBody.reasoning_effort = REASONING_EFFORT
  } else {
    requestBody.temperature = 0.7
  }

  const response = await requestDeepSeek(requestBody)
  await recordUsage(response.usage || {}, action)
  const content =
    response && response.choices && response.choices[0] && response.choices[0].message
      ? response.choices[0].message.content
      : ""
  if (!content) throw new Error("AI response is empty")
  return parseJson(content)
}

exports.main = async (event = {}) => {
  const action = event.action || ""
  const payload = event.payload || {}

  try {
    if (action === "analyzeReading") {
      const raw = await generateJson(readingPrompt(payload), action)
      return {
        ok: true,
        analysis: normalizeReading(raw, payload.fallback || payload)
      }
    }

    if (action === "analyzeDiaryEmotion") {
      const raw = await generateJson(diaryPrompt(payload), action)
      return {
        ok: true,
        analysis: normalizeDiaryEmotion(raw, payload.fallback || {})
      }
    }

    return { ok: false, error: `Unsupported action: ${action}` }
  } catch (error) {
    console.warn("[analysis] AI call failed", error)
    return {
      ok: false,
      error: error && (error.message || error.errMsg) ? error.message || error.errMsg : String(error)
    }
  }
}

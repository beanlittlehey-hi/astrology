const {
  tarotDeck,
  scenes,
  spreads,
  emotionTemplates,
  sampleDiaries
} = require("../../data/content")
const cloudApi = require("../../services/cloudApi")
const { getNavLayout } = require("../../utils/navLayout")

const STORAGE_KEY = "tarot_healing_v03_fresh_login"
const CLOUD_MIGRATION_KEY = `${STORAGE_KEY}_cloud_migrated`

function pad(value) {
  return String(value).padStart(2, "0")
}

function formatDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function formatCloudDate(value) {
  if (!value) return formatDate()
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return formatDate()
  return formatDate(date)
}

function dateKeyFromDate(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function diaryDateKey(diary = {}) {
  const value = String(diary.date || diary.dateText || diary.createdAtText || "")
  const match = value.match(/\d{4}-\d{2}-\d{2}/)
  if (match) return match[0]
  return dateKeyFromDate()
}

function parseDateKey(dateKey) {
  const parts = String(dateKey || "").split("-").map(Number)
  if (parts.length !== 3 || parts.some((item) => Number.isNaN(item))) return new Date()
  return new Date(parts[0], parts[1] - 1, parts[2])
}

function journalDayLabel(dateKey) {
  const date = parseDateKey(dateKey)
  const weekLabels = ["日", "一", "二", "三", "四", "五", "六"]
  return {
    week: weekLabels[date.getDay()],
    day: String(date.getDate())
  }
}

function addDays(date, offset) {
  const next = new Date(date)
  next.setDate(next.getDate() + offset)
  return next
}

function startOfWeek(date = new Date()) {
  const next = new Date(date)
  const day = next.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  next.setDate(next.getDate() + mondayOffset)
  return next
}

function buildJournalCalendarDays(diaries = [], selectedDate = "all") {
  const weekStart = startOfWeek(new Date())
  const keys = Array.from({ length: 7 }, (_, index) => dateKeyFromDate(addDays(weekStart, index)))
  const dateItems = keys.map((key) => {
    const label = journalDayLabel(key)
    return {
      key,
      type: "date",
      week: label.week,
      day: label.day,
      selected: selectedDate === key
    }
  })

  return [{
    key: "all",
    type: "all",
    week: "",
    day: "全部",
    selected: selectedDate === "all"
  }].concat(dateItems)
}

function buildJournalAllDates(diaries = [], selectedDate = "all") {
  const keys = []
  diaries.forEach((diary) => {
    const key = diaryDateKey(diary)
    if (key && !keys.includes(key)) keys.push(key)
  })
  return keys.sort((a, b) => b.localeCompare(a)).map((key) => {
    const label = journalDayLabel(key)
    return {
      key,
      week: label.week,
      day: label.day,
      selected: selectedDate === key
    }
  })
}

function defaultJournalDate(diaries = []) {
  return "all"
}

function buildJournalState(diaries = [], selectedDate) {
  const decorated = diaries.map(decorateDiary)
  const date = selectedDate || defaultJournalDate(decorated)
  const filteredDiaries =
    date === "all" ? decorated : decorated.filter((diary) => diary.journalDateKey === date)
  return {
    selectedJournalDate: date,
    journalCalendarDays: buildJournalCalendarDays(decorated, date),
    journalAllDates: buildJournalAllDates(decorated, date),
    filteredDiaries,
    journalHasFilteredDiaries: filteredDiaries.length > 0
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function uniqueCards(count) {
  const pool = tarotDeck.slice().sort(() => Math.random() - 0.5)
  return pool.slice(0, count)
}

function sceneName(sceneId) {
  const scene = scenes.find((item) => item.id === sceneId)
  return scene ? scene.name : "综合"
}

function makeDrawnCards(spread) {
  const cards = uniqueCards(spread.positions.length)
  return spread.positions.map((position, index) => {
    const card = cards[index] || pickRandom(tarotDeck)
    const reversed = Math.random() > 0.62
    return {
      ...card,
      position,
      reversed,
      orientation: reversed ? "逆位" : "正位",
      meaning: reversed ? card.reversed : card.upright,
      keywordText: card.keywords.join(" / ")
    }
  })
}

function readingTextForScene(card, sceneId) {
  if (sceneId === "love") return card.loveReading || card.upright
  if (sceneId === "work" || sceneId === "wealth") return card.workReading || card.upright
  return card.healingReading || card.upright
}

function isReversedCard(card) {
  return card.orientation === "逆位" || card.reversed === true
}

function orientationText(card) {
  const source = tarotDeck.find((item) => item.id === card.id) || card
  if (isReversedCard(card)) {
    return card.meaning || (typeof source.reversed === "string" ? source.reversed : source.upright)
  }
  return card.meaning || source.upright
}

function buildCardInsights(cards, sceneId) {
  return cards.map((card) => {
    const sceneText = readingTextForScene(card, sceneId)
    const positionLead = `在「${card.position}」这个位置，${card.name}${card.orientation}先指向${card.keywordText}。`
    return {
      position: card.position,
      title: `${card.position}：${card.name}${card.orientation}`,
      keywords: card.keywordText,
      text: `${positionLead}${sceneText}${isReversedCard(card) ? ` ${orientationText(card)}` : ""}`
    }
  })
}

function dominantSuitText(cards) {
  const suitNames = {
    cups: "圣杯",
    swords: "宝剑",
    wands: "权杖",
    pentacles: "星币"
  }
  const suitHints = {
    cups: "圣杯较多，说明关系、情绪、依恋和真实需求是这次牌阵的重点。",
    swords: "宝剑较多，说明焦虑、沟通、判断和想象过载需要被认真整理。",
    wands: "权杖较多，说明行动、热情、冲动和推进节奏正在影响结果。",
    pentacles: "星币较多，说明现实基础、时间、承诺和资源安排是关键。"
  }
  const counts = cards.reduce((result, card) => {
    if (suitNames[card.suit]) result[card.suit] = (result[card.suit] || 0) + 1
    return result
  }, {})
  const dominant = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0]
  if (!dominant || counts[dominant] < 2) return ""
  return suitHints[dominant]
}

function isCourtCard(card) {
  return /-(11-page|12-knight|13-queen|14-king)$/.test(card.id)
}

function buildCombinationInsight(cards) {
  const messages = []
  const majorCount = cards.filter((card) => card.arcana === "major").length
  const reversedCount = cards.filter(isReversedCard).length
  const courtCount = cards.filter(isCourtCard).length
  const suitMessage = dominantSuitText(cards)

  if (majorCount >= 2) {
    messages.push("大阿卡那较多，这不是一阵小情绪，而是一个阶段性主题正在浮出水面。")
  }
  if (suitMessage) messages.push(suitMessage)
  if (reversedCount > cards.length / 2) {
    messages.push("逆位较多，当前更适合先修正节奏，不急于推进或逼自己立刻做决定。")
  }
  if (courtCount >= 2) {
    messages.push("宫廷牌较多，人际角色、互动方式和彼此的行动倾向会成为关键。")
  }
  if (!messages.length) {
    messages.push("这组牌的能量比较分散，适合先抓住最可控的一步，把注意力从结果拉回当下。")
  }
  return messages.join("")
}

function buildReadingTitle(sceneId, cards) {
  const first = cards[0]
  if (sceneId === "love") return `${first.name}提醒你先看清真实需求`
  if (sceneId === "work" || sceneId === "wealth") return `${first.name}提醒你把问题落到行动`
  return `${first.name}提醒你回到自己的节奏`
}

function buildProfessionalReading({ sceneId, cards }) {
  const template = emotionTemplates[sceneId] || emotionTemplates.other
  const first = cards[0]
  const cardInsights = buildCardInsights(cards, sceneId)
  const combinationInsight = buildCombinationInsight(cards)
  const sceneText = readingTextForScene(first, sceneId)
  const actionSource = first.actionAdvice || template.action
  return {
    emotionTags: template.tags,
    emotionText: template.tags.join("、"),
    title: buildReadingTitle(sceneId, cards),
    summary: `这组牌以${first.name}${first.orientation}为入口，提示你先看见「${first.keywordText}」。${sceneText}`,
    cardInsights,
    combinationInsight,
    mirror: `${template.mirror}${combinationInsight}`,
    action: `${actionSource} ${template.action}`,
    writing: template.writing
  }
}

function buildSession({ sceneId, spread, question, cards }) {
  const cardText = cards.map((item) => `${item.position}：${item.name}${item.orientation}`).join("、")
  const reading = buildProfessionalReading({ sceneId, spread, question, cards })
  return {
    id: `session-${Date.now()}`,
    question: question || "我想看看此刻更适合怎样照顾自己。",
    sceneId,
    sceneName: sceneName(sceneId),
    spreadId: spread.id,
    spreadName: spread.name,
    cards,
    cardText,
    ...reading,
    createdAt: formatDate()
  }
}

function ensureProfessionalSession(session) {
  if (!session || !session.cards || session.cardInsights) return session
  const cards = session.cards.map((card, index) => ({
    ...card,
    position: card.position || `第 ${index + 1} 张`,
    orientation: card.orientation || (card.reversed === true ? "逆位" : "正位"),
    meaning: card.meaning || orientationText(card),
    keywordText: card.keywordText || (card.keywords || []).join(" / ")
  }))
  const spread =
    spreads.find((item) => item.id === session.spreadId) ||
    {
      id: session.spreadId || "saved",
      name: session.spreadName || "已保存牌阵",
      positions: cards.map((card) => card.position)
    }
  const reading = buildProfessionalReading({
    sceneId: session.sceneId || "other",
    spread,
    question: session.question,
    cards
  })
  return {
    ...session,
    cards,
    cardText: session.cardText || cards.map((item) => `${item.position}：${item.name}${item.orientation}`).join("、"),
    ...reading
  }
}

function buildDiaryFromSession(session, userInput) {
  return decorateDiary({
    id: `diary-${Date.now()}`,
    title: session.sceneId === "love" ? "今天的关系记录" : `${session.sceneName}测算记录`,
    date: formatDate(),
    sceneName: session.sceneName,
    emotionTags: session.emotionTags,
    summary: session.mirror,
    userInput: userInput || "我想先把现在的感受记下来，过几天再回看。",
    cardsText: `${session.spreadName}：${session.cardText}。`,
    suggestion: session.writing,
    session
  })
}

function decorateDiary(diary) {
  const firstEmotion = (diary.emotionTags || [])[0] || "平静"
  const emotionTags = Array.isArray(diary.emotionTags) ? diary.emotionTags : []
  const fallbackTags = String(diary.emotionText || "")
    .split(/[、/，,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
  const homeTags = (emotionTags.length ? emotionTags : fallbackTags).slice(0, 3)
  const journalDateKey = diaryDateKey(diary)
  const moodMap = {
    焦虑: "anxiety",
    平静: "calm",
    犹豫: "hesitate",
    期待: "hope",
    观察: "calm",
    内耗: "anxiety",
    失落: "anxiety",
    压力: "hesitate"
  }
  return {
    ...diary,
    journalDateKey,
    emotionText: emotionTags.join(" / "),
    homeEmotionTags: homeTags,
    homeEmotionText: homeTags.join(" / "),
    firstEmotion,
    moodClass: moodMap[firstEmotion] || "calm"
  }
}

function isUserDiary(diary) {
  return diary && diary.id && !String(diary.id).startsWith("sample-")
}

function cloudRecordToDiary(record = {}) {
  return decorateDiary({
    id: record.localId || record._id || `cloud-diary-${Date.now()}`,
    cloudId: record._id,
    title: record.title || "情绪日记",
    date: record.dateText || record.createdAtText || formatCloudDate(record.createdAt),
    sceneName: record.sceneName || "综合",
    emotionTags: record.emotionTags || [],
    summary: record.summary || "",
    userInput: record.userInput || "",
    cardsText: record.cardsText || "",
    suggestion: record.suggestion || "",
    session: record.session || null
  })
}

function mergeReadingAnalysis(session, analysis) {
  if (!analysis) return session
  const cardInsights =
    Array.isArray(analysis.cardInsights) && analysis.cardInsights.length
      ? analysis.cardInsights
      : session.cardInsights
  const emotionTags =
    Array.isArray(analysis.emotionTags) && analysis.emotionTags.length
      ? analysis.emotionTags
      : session.emotionTags
  return {
    ...session,
    title: analysis.title || session.title,
    summary: analysis.summary || session.summary,
    cardInsights,
    combinationInsight: analysis.combinationInsight || session.combinationInsight,
    emotionTags,
    emotionText: analysis.emotionText || emotionTags.join("、"),
    mirror: analysis.mirror || session.mirror,
    action: analysis.action || session.action,
    writing: analysis.writing || session.writing,
    aiEnhanced: true
  }
}

function mergeDiaryEmotion(diary, analysis) {
  if (!analysis) return diary
  const emotionTags =
    Array.isArray(analysis.emotionTags) && analysis.emotionTags.length
      ? analysis.emotionTags
      : diary.emotionTags
  return decorateDiary({
    ...diary,
    emotionTags,
    summary: analysis.summary || diary.summary,
    suggestion: analysis.suggestion || diary.suggestion,
    userInputInsight: analysis.userInputInsight || diary.userInputInsight
  })
}

function shouldShowTab(screen) {
  return screen !== "splash"
}

Page({
  data: {
    screen: "splash",
    showTab: false,
    navLayout: getNavLayout(),
    loggedIn: false,
    drawerOpen: false,
    authSheetOpen: false,
    authLoading: false,
    scenes,
    spreads,
    tarotDeck,
    selectedScene: "love",
    selectedSceneName: "感情",
    selectedSceneHint: "推荐爱情十字、二选一和三张牌阵。",
    selectedSpreadId: "cross",
    question: "对方最近忽冷忽热，我应该继续主动吗？",
    selectedSpread: spreads.find((item) => item.id === "cross"),
    filteredSpreads: [],
    dailyCard: null,
    dailyNote: "",
    hasShuffled: false,
    isShuffling: false,
    shuffleText: "点击洗牌",
    drawStep: 0,
    drawnCards: [],
    drawSlots: [],
    deckBacks: Array.from({ length: 12 }, (_, index) => index),
    wheelCards: Array.from({ length: 30 }, (_, index) => index),
    currentDrawPosition: "你",
    drawQuestionDraft: "",
    drawQuestionConfirmed: false,
    drawSubtitle: "爱情十字牌阵",
    currentSession: null,
    resultBackScreen: "draw",
    resultBackNav: "reading",
    resultNote: "我真正害怕的是不是被忽视？",
    diaries: [],
    selectedJournalDate: "all",
    journalCalendarDays: [],
    journalAllDates: [],
    journalCalendarOpen: false,
    filteredDiaries: [],
    journalHasFilteredDiaries: false,
    activeDiary: null,
    drawHint: "先洗牌，再选择牌",
    navItems: [
      { id: "home", label: "首页", screen: "home" },
      { id: "reading", label: "测算", screen: "question" },
      { id: "journal", label: "日记", screen: "journal" }
    ],
    activeNav: "home",
    moodBars: [
      { label: "焦虑", height: 36, cls: "anxiety" },
      { label: "平静", height: 58, cls: "calm" },
      { label: "期待", height: 46, cls: "hope" },
      { label: "犹豫", height: 42, cls: "hesitate" },
      { label: "焦虑", height: 28, cls: "anxiety" },
      { label: "平静", height: 62, cls: "calm" }
    ]
  },

  onLoad() {
    this.refreshNavLayout()
    this.restoreState()
    this.refreshSpreadOptions()
    this.drawDaily(false)
    if (this.data.loggedIn) {
      this.syncCloudAfterLogin(false)
    }
  },

  onShow() {
    this.refreshNavLayout()
  },

  refreshNavLayout() {
    this.setData({ navLayout: getNavLayout() })
  },

  restoreState() {
    const saved = wx.getStorageSync(STORAGE_KEY) || {}
    const diaries = (saved.diaries && saved.diaries.length ? saved.diaries : sampleDiaries).map(decorateDiary)
    this.localHasUserDiaries = Boolean(saved.diaries && saved.diaries.some(isUserDiary))
    this.setData({
      loggedIn: Boolean(saved.loggedIn),
      diaries,
      ...buildJournalState(diaries),
      screen: saved.loggedIn ? "home" : "splash",
      showTab: shouldShowTab(saved.loggedIn ? "home" : "splash"),
      activeDiary: diaries[0] || null
    })
  },

  persist(patch = {}) {
    const current = wx.getStorageSync(STORAGE_KEY) || {}
    wx.setStorageSync(STORAGE_KEY, {
      ...current,
      loggedIn: this.data.loggedIn,
      diaries: this.data.diaries.map(decorateDiary),
      ...patch
    })
  },

  async syncCloudAfterLogin() {
    if (!cloudApi.isAvailable()) return
    const userResult = await cloudApi.upsertUser()
    if (!userResult.ok) return
    await this.migrateLocalDiariesOnce()
    await this.loadCloudDiaries(true)
  },

  async migrateLocalDiariesOnce() {
    if (!cloudApi.isAvailable()) return
    if (wx.getStorageSync(CLOUD_MIGRATION_KEY)) return
    const saved = wx.getStorageSync(STORAGE_KEY) || {}
    const localDiaries = (saved.diaries || []).filter(isUserDiary).map(decorateDiary)
    if (!localDiaries.length) return
    const result = await cloudApi.migrateDiaries(localDiaries)
    if (result.ok) {
      wx.setStorageSync(CLOUD_MIGRATION_KEY, true)
    }
  },

  async loadCloudDiaries(silent = false) {
    if (!cloudApi.isAvailable()) return
    const result = await cloudApi.listDiaries()
    if (!result.ok) {
      if (!silent) wx.showToast({ title: "云端日记读取失败，已使用本地记录", icon: "none" })
      return
    }
    const cloudDiaries = (result.records || []).map(cloudRecordToDiary)
    if (!cloudDiaries.length) return
    this.setData({
      diaries: cloudDiaries,
      ...buildJournalState(cloudDiaries),
      activeDiary: cloudDiaries[0] || this.data.activeDiary
    })
    this.persist({ diaries: cloudDiaries })
  },

  async syncDiaryToCloud(diary) {
    if (!cloudApi.isAvailable() || !isUserDiary(diary)) return
    const result = await cloudApi.createDiary(decorateDiary(diary))
    if (!result.ok) {
      console.warn("[cloud] diary create failed", result.error)
    }
  },

  async syncReadingToCloud(session) {
    if (!cloudApi.isAvailable() || !session) return
    const result = await cloudApi.createReading(session)
    if (!result.ok) {
      console.warn("[cloud] reading create failed", result.error)
    }
  },

  async syncDailyToCloud(record) {
    if (!cloudApi.isAvailable() || !record) return
    const result = await cloudApi.createDaily(record)
    if (!result.ok) {
      console.warn("[cloud] daily create failed", result.error)
    }
  },

  async analyzeReadingSession(session, spread) {
    if (!cloudApi.isAvailable()) return session
    const result = await cloudApi.analyzeReading({
      question: session.question,
      sceneId: session.sceneId,
      sceneName: session.sceneName,
      spreadId: session.spreadId,
      spreadName: session.spreadName,
      spreadPositions: spread.positions,
      cards: session.cards,
      fallback: session
    })
    if (result.ok && result.analysis) {
      return mergeReadingAnalysis(session, result.analysis)
    }
    console.warn("[cloud] reading analysis failed", result.error)
    wx.showToast({ title: "已使用本地解读兜底", icon: "none" })
    return session
  },

  async analyzeDiaryEmotion(diary, userInput, session) {
    if (!cloudApi.isAvailable()) return diary
    const result = await cloudApi.analyzeDiaryEmotion({
      userInput,
      session,
      fallback: {
        emotionTags: diary.emotionTags,
        summary: diary.summary,
        suggestion: diary.suggestion
      }
    })
    if (result.ok && result.analysis) {
      return mergeDiaryEmotion(diary, result.analysis)
    }
    console.warn("[cloud] diary emotion analysis failed", result.error)
    wx.showToast({ title: "已使用本地情绪识别兜底", icon: "none" })
    return diary
  },

  go(event) {
    const screen = event.currentTarget.dataset.screen
    const nav = event.currentTarget.dataset.nav
    this.setData({
      screen,
      showTab: shouldShowTab(screen),
      activeNav: nav || this.navForScreen(screen),
      drawerOpen: false
    })
    if (screen === "journal") {
      this.loadCloudDiaries(true)
    }
  },

  navForScreen(screen) {
    if (screen === "journal" || screen === "diary") return "journal"
    if (screen === "question" || screen === "draw" || screen === "result") return "reading"
    return "home"
  },

  enterApp() {
    this.setData({ authSheetOpen: true })
  },

  closeAuthSheet() {
    if (this.data.authLoading) return
    this.setData({ authSheetOpen: false })
  },

  finishLogin() {
    this.setData({
      loggedIn: true,
      screen: "home",
      showTab: true,
      activeNav: "home",
      authSheetOpen: false,
      authLoading: false
    })
    this.persist({ loggedIn: true })
    this.syncCloudAfterLogin(true)
    wx.showToast({ title: "已进入月栖卡牌日记", icon: "none" })
  },

  startWechatLogin() {
    if (this.data.authLoading) return
    this.setData({ authLoading: true })
    wx.login({
      success: () => {
        this.finishLogin()
      },
      fail: () => {
        this.setData({ authLoading: false })
        wx.showToast({ title: "微信登录失败，请稍后重试", icon: "none" })
      }
    })
  },

  login() {
    this.startWechatLogin()
  },

  logout() {
    this.setData({
      loggedIn: false,
      screen: "splash",
      showTab: false,
      drawerOpen: false,
      authSheetOpen: false,
      authLoading: false
    })
    this.persist({ loggedIn: false })
    wx.showToast({ title: "已退出登录", icon: "none" })
  },

  toggleDrawer() {
    this.setData({ drawerOpen: !this.data.drawerOpen })
  },

  drawDaily(showToast = true) {
    const card = pickRandom(tarotDeck)
    this.setData({
      dailyCard: {
        ...card,
        keywordText: card.keywords.join(" / "),
        advice: card.upright
      }
    })
    if (showToast) wx.showToast({ title: "今日牌已更新", icon: "none" })
  },

  onDailyInput(event) {
    this.setData({ dailyNote: event.detail.value })
  },

  saveDailyDiary() {
    const card = this.data.dailyCard || pickRandom(tarotDeck)
    const dailySession = {
      id: `daily-session-${Date.now()}`,
      question: "今日单张牌提醒",
      sceneId: "other",
      sceneName: "综合",
      spreadId: "daily",
      spreadName: "今日单张牌",
      cards: [
        {
          ...card,
          position: "今日提醒",
          orientation: "正位",
          meaning: card.advice || card.upright,
          keywordText: card.keywordText || card.keywords.join(" / ")
        }
      ],
      cardText: `今日提醒：${card.name}正位`,
      emotionTags: ["平静", "观察"],
      emotionText: "平静、观察",
      title: "今日单张牌记录",
      summary: `${card.name}提醒你：${card.advice || card.upright}`,
      mirror: `${card.name}提醒你：${card.advice || card.upright}`,
      action: "今天先选择一个能让自己稳定下来的小行动，完成后再回看感受。",
      writing: "下次回来可以看：今天我有没有把注意力放回自己身上？",
      createdAt: formatDate()
    }
    const diary = {
      id: `daily-${Date.now()}`,
      title: "今日单张牌记录",
      date: formatDate(),
      sceneName: "综合",
      emotionTags: ["平静", "观察"],
      summary: `${card.name}提醒你：${card.advice || card.upright}`,
      userInput: this.data.dailyNote || "我想把今天的提醒留给晚一点的自己。",
      cardsText: `今日单张牌：${card.name}。`,
      suggestion: "下次回来可以看：今天我有没有把注意力放回自己身上？",
      session: dailySession
    }
    this.syncDailyToCloud({
      id: dailySession.id,
      dayKey: dailySession.createdAt.slice(0, 10),
      card: dailySession.cards[0],
      note: this.data.dailyNote,
      session: dailySession,
      diaryLocalId: diary.id,
      createdAt: dailySession.createdAt
    })
    this.addDiary(decorateDiary(diary))
  },

  chooseScene(event) {
    const selectedScene = event.currentTarget.dataset.scene
    const recommended = selectedScene === "love" ? "cross" : (selectedScene === "work" ? "career" : "three")
    this.setData({
      selectedScene,
      selectedSpreadId: recommended
    })
    this.refreshSpreadOptions()
  },

  refreshSpreadOptions() {
    const currentScene = scenes.find((scene) => scene.id === this.data.selectedScene) || scenes[0]
    const recommendByScene = {
      love: "cross",
      work: "career",
      other: "three"
    }
    const recommendedSpreadId = recommendByScene[this.data.selectedScene] || "three"
    const questionOrder = ["three", "cross", "choice", "career"]
    const filteredSpreads = questionOrder
      .map((id) => spreads.find((spread) => spread.id === id))
      .filter(Boolean)
      .map((spread) => ({
        ...spread,
        disabled: false,
        recommended: spread.id === recommendedSpreadId
      }))
    const selectedSpread =
      filteredSpreads.find((spread) => spread.id === this.data.selectedSpreadId) ||
      filteredSpreads.find((spread) => spread.id === recommendedSpreadId) ||
      filteredSpreads.find((spread) => !spread.disabled)
    this.setData({
      filteredSpreads,
      selectedSpreadId: selectedSpread ? selectedSpread.id : this.data.selectedSpreadId,
      selectedSpread,
      selectedSceneName: currentScene.name,
      selectedSceneHint: currentScene.hint
    })
  },

  chooseSpread(event) {
    const spreadId = event.currentTarget.dataset.spread
    const spread = spreads.find((item) => item.id === spreadId)
    if (!spread) {
      wx.showToast({ title: "暂未找到这个牌阵", icon: "none" })
      return
    }
    this.setData({
      selectedSpreadId: spreadId,
      selectedSpread: spread
    })
    this.refreshSpreadOptions()
    this.startDraw(spread)
  },

  onQuestionInput(event) {
    this.setData({ question: event.detail.value })
  },

  confirmQuestion() {
    const question = this.data.question.trim()
    if (!question) {
      wx.showToast({ title: "可以先写一句困惑", icon: "none" })
      return
    }
    wx.showToast({ title: "已确认", icon: "none" })
  },

  onDrawQuestionInput(event) {
    this.setData({ drawQuestionDraft: event.detail.value })
  },

  submitDrawQuestion() {
    const question = (this.data.drawQuestionDraft || "").trim()
    if (!question) {
      wx.showToast({ title: "请输入您的问题", icon: "none" })
      return
    }
    const spread = this.data.selectedSpread || spreads[0]
    this.setData({
      question,
      drawQuestionDraft: question,
      drawQuestionConfirmed: true,
      hasShuffled: false,
      isShuffling: false,
      shuffleText: "点击洗牌",
      drawStep: 0,
      drawnCards: [],
      drawSlots: spread.positions.map((position) => ({
        position,
        drawn: false,
        previewName: "",
        status: "待抽"
      })),
      currentDrawPosition: spread.positions[0] || "你",
      drawSubtitle: spread.name,
      drawHint: "等待洗牌"
    })
  },

  startDraw(spreadOverride) {
    const selectedSpread = spreadOverride || this.data.selectedSpread || spreads[0]
    this.setData({
      screen: "draw",
      showTab: true,
      activeNav: "reading",
      hasShuffled: false,
      isShuffling: false,
      shuffleText: "点击洗牌",
      drawStep: 0,
      drawnCards: [],
      question: "",
      drawQuestionDraft: "",
      drawQuestionConfirmed: false,
      drawSlots: selectedSpread.positions.map((position) => ({
        position,
        drawn: false,
        previewName: "",
        status: "待抽"
      })),
      currentDrawPosition: selectedSpread.positions[0] || "你",
      drawSubtitle: selectedSpread.name,
      drawHint: "等待选择第 1 张牌",
      selectedSpread
    })
  },

  shuffleDeck() {
    if (!this.data.drawQuestionConfirmed) {
      wx.showToast({ title: "请先输入问题并回车", icon: "none" })
      return
    }
    this.setData({
      isShuffling: true,
      shuffleText: "洗牌中...",
      drawStep: 0,
      drawnCards: [],
      drawSlots: (this.data.selectedSpread || spreads[0]).positions.map((position) => ({
        position,
        drawn: false,
        previewName: "",
        status: "待抽"
      })),
      currentDrawPosition: (this.data.selectedSpread || spreads[0]).positions[0] || "你",
      drawSubtitle: (this.data.selectedSpread || spreads[0]).name,
      drawHint: "正在洗牌，请跟随直觉停留片刻"
    })
    setTimeout(() => {
      this.setData({
        hasShuffled: true,
        isShuffling: false,
        shuffleText: "重新洗牌",
        drawSubtitle: `第 1 张牌 / ${(this.data.selectedSpread || spreads[0]).positions[0] || "你"}`,
        drawHint: "等待选择第 1 张牌"
      })
      wx.showToast({ title: "牌堆已洗好", icon: "none" })
    }, 900)
  },

  drawOneCard() {
    if (!this.data.hasShuffled) {
      wx.showToast({ title: "先点击洗牌", icon: "none" })
      return
    }
    const spread = this.data.selectedSpread || spreads[0]
    const nextIndex = this.data.drawStep
    if (nextIndex >= spread.positions.length) {
      wx.showToast({ title: "已经抽完啦", icon: "none" })
      return
    }
    const existingIds = this.data.drawnCards.map((item) => item.id)
    const pool = tarotDeck.filter((item) => !existingIds.includes(item.id))
    const card = pickRandom(pool.length ? pool : tarotDeck)
    const reversed = Math.random() > 0.62
    const drawn = {
      ...card,
      position: spread.positions[nextIndex],
      reversed,
      orientation: reversed ? "逆位" : "正位",
      meaning: reversed ? card.reversed : card.upright,
      keywordText: card.keywords.join(" / ")
    }
    const drawnCards = this.data.drawnCards.concat(drawn)
    const drawSlots = spread.positions.map((position, index) => {
      const card = drawnCards[index]
      return card
        ? {
            position,
            drawn: true,
            image: card.image,
            name: card.name,
            previewName: card.name,
            status: `${card.name} · ${card.orientation}`
          }
        : {
            position,
            drawn: false,
            previewName: "",
            status: "待抽"
          }
    })
    const nextStep = nextIndex + 1
    this.setData({
      drawnCards,
      drawSlots,
      drawStep: nextStep,
      currentDrawPosition: spread.positions[nextStep] || spread.positions[spread.positions.length - 1] || "关系",
      drawSubtitle: `第 ${nextStep >= spread.positions.length ? spread.positions.length : nextStep + 1} 张牌 / ${spread.positions[nextStep] || spread.positions[spread.positions.length - 1] || "关系"}`,
      drawHint:
        nextStep >= spread.positions.length
          ? "已经抽完，可以查看解读"
          : `等待选择第 ${nextStep + 1} 张牌`
    })
  },

  async viewResult() {
    const spread = this.data.selectedSpread || spreads[0]
    let cards = this.data.drawnCards
    if (cards.length < spread.positions.length) {
      cards = makeDrawnCards(spread)
    }
    const drawSlots = spread.positions.map((position, index) => {
      const card = cards[index]
      return {
        position,
        drawn: true,
        image: card.image,
        name: card.name,
        previewName: card.name,
        status: `${card.name} · ${card.orientation}`
      }
    })
    const session = buildSession({
      sceneId: this.data.selectedScene,
      spread,
      question: this.data.question.trim(),
      cards
    })
    let finalSession = session
    if (cloudApi.isAvailable()) {
      wx.showLoading({ title: "正在解读牌面", mask: true })
      try {
        finalSession = await this.analyzeReadingSession(session, spread)
      } finally {
        wx.hideLoading()
      }
    }
    this.setData({
      currentSession: finalSession,
      drawnCards: cards,
      drawSlots,
      resultNote: "我真正害怕的是不是被忽视？",
      currentDrawPosition: spread.positions[spread.positions.length - 1] || "关系",
      resultBackScreen: "draw",
      resultBackNav: "reading",
      screen: "result",
      showTab: true,
      activeNav: "reading"
    })
    this.syncReadingToCloud(finalSession)
  },

  onResultNote(event) {
    this.setData({ resultNote: event.detail.value })
  },

  async saveSessionDiary() {
    if (!this.data.currentSession) {
      wx.showToast({ title: "还没有测算结果", icon: "none" })
      return
    }
    let diary = buildDiaryFromSession(this.data.currentSession, this.data.resultNote)
    if (cloudApi.isAvailable()) {
      wx.showLoading({ title: "正在整理情绪日记", mask: true })
      try {
        diary = await this.analyzeDiaryEmotion(diary, this.data.resultNote, this.data.currentSession)
      } finally {
        wx.hideLoading()
      }
    }
    this.addDiary(diary)
  },

  addDiary(diary) {
    const savedDiary = decorateDiary(diary)
    const diaries = [savedDiary].concat(this.data.diaries.map(decorateDiary))
    this.setData({
      diaries,
      ...buildJournalState(diaries, savedDiary.journalDateKey),
      activeDiary: savedDiary,
      screen: "diary",
      showTab: true,
      activeNav: "journal"
    })
    this.persist({ diaries })
    this.syncDiaryToCloud(savedDiary)
    wx.showToast({ title: "已保存到日记", icon: "none" })
  },

  selectJournalDate(event) {
    const date = event.currentTarget.dataset.date || "all"
    const type = event.currentTarget.dataset.type || "date"
    if (type === "more") {
      this.setData({
        journalCalendarOpen: true,
        ...buildJournalState(this.data.diaries, this.data.selectedJournalDate)
      })
      return
    }
    this.setData({
      ...buildJournalState(this.data.diaries, date),
      journalCalendarOpen: false
    })
  },

  closeJournalCalendar() {
    this.setData({ journalCalendarOpen: false })
  },

  openDiary(event) {
    const id = event.currentTarget.dataset.id
    const activeDiary = this.data.diaries.find((item) => item.id === id) || this.data.diaries[0]
    this.setData({
      activeDiary,
      screen: "diary",
      showTab: true,
      activeNav: "journal"
    })
  },

  openDiaryReport() {
    if (this.data.activeDiary && this.data.activeDiary.session) {
      const session = ensureProfessionalSession(this.data.activeDiary.session)
      this.setData({
        currentSession: session,
        resultBackScreen: "diary",
        resultBackNav: "journal",
        screen: "result",
        showTab: true,
        activeNav: "reading"
      })
      return
    }
    wx.showToast({ title: "这条示例日记没有完整报告，请先完成一次测算", icon: "none" })
  },

  backFromResult() {
    const screen = this.data.resultBackScreen || "draw"
    const nav = this.data.resultBackNav || this.navForScreen(screen)
    this.setData({
      screen,
      showTab: shouldShowTab(screen),
      activeNav: nav
    })
  },

  showDisclaimer() {
    wx.showModal({
      title: "内容说明",
      content: "内容仅供娱乐、情绪陪伴和自我探索参考，不构成医疗、心理诊断、法律或投资建议。",
      showCancel: false,
      confirmText: "我知道了"
    })
  },

  resetLocalData() {
    wx.showModal({
      title: "重置体验数据",
      content: "会清空本地模拟登录、抽牌和日记记录，不影响原型图与源码。",
      success: (res) => {
        if (!res.confirm) return
        wx.removeStorageSync(STORAGE_KEY)
        const diaries = sampleDiaries.map(decorateDiary)
        this.setData({
          loggedIn: false,
          screen: "splash",
          showTab: false,
          diaries,
          activeDiary: diaries[0],
          drawerOpen: false,
          authSheetOpen: false,
          authLoading: false
        })
      }
    })
  }
})

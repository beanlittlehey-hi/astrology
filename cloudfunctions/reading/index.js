const cloud = require("wx-server-sdk")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = "readings"

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

function normalizeSession(session = {}) {
  return {
    localId: session.id || "",
    question: session.question || "",
    sceneId: session.sceneId || "other",
    sceneName: session.sceneName || "综合",
    spreadId: session.spreadId || "",
    spreadName: session.spreadName || "",
    cards: session.cards || [],
    cardText: session.cardText || "",
    title: session.title || "",
    summary: session.summary || "",
    mirror: session.mirror || "",
    action: session.action || "",
    writing: session.writing || "",
    emotionTags: session.emotionTags || [],
    emotionText: session.emotionText || "",
    combinationInsight: session.combinationInsight || "",
    cardInsights: session.cardInsights || [],
    createdAtText: session.createdAt || ""
  }
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action || "list"
  const payload = event.payload || {}

  if (!OPENID) {
    return { ok: false, error: "OPENID is missing" }
  }

  await ensureCollection(COLLECTION)
  const collection = db.collection(COLLECTION)

  if (action === "create") {
    const session = normalizeSession(payload.session)
    const now = new Date()
    const created = await collection.add({
      data: {
        _openid: OPENID,
        openid: OPENID,
        ...session,
        createdAt: now,
        updatedAt: now
      }
    })
    return { ok: true, id: created._id }
  }

  if (action === "list") {
    const result = await collection.where({ openid: OPENID }).orderBy("createdAt", "desc").limit(50).get()
    return { ok: true, records: result.data || [] }
  }

  if (action === "get") {
    const id = payload.id
    if (!id) return { ok: false, error: "id is required" }
    const result = await collection.doc(id).get()
    if (!result.data || result.data.openid !== OPENID) {
      return { ok: false, error: "record not found" }
    }
    return { ok: true, record: result.data }
  }

  return { ok: false, error: `Unsupported action: ${action}` }
}

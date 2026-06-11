const cloud = require("wx-server-sdk")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = "daily_cards"

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

function dayKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function normalizeRecord(record = {}) {
  const card = record.card || (record.session && record.session.cards && record.session.cards[0]) || {}
  return {
    localId: record.id || (record.session && record.session.id) || "",
    dayKey: record.dayKey || dayKey(),
    card,
    cardName: card.name || "",
    keywords: card.keywords || [],
    keywordText: card.keywordText || "",
    advice: card.advice || card.meaning || card.upright || "",
    note: record.note || "",
    session: record.session || null,
    diaryLocalId: record.diaryLocalId || "",
    createdAtText: record.createdAt || ""
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
    const record = normalizeRecord(payload.record)
    const now = new Date()
    const created = await collection.add({
      data: {
        _openid: OPENID,
        openid: OPENID,
        ...record,
        createdAt: now,
        updatedAt: now
      }
    })
    return { ok: true, id: created._id }
  }

  if (action === "list") {
    const result = await collection.where({ openid: OPENID }).orderBy("createdAt", "desc").limit(60).get()
    return { ok: true, records: result.data || [] }
  }

  if (action === "getToday") {
    const key = payload.dayKey || dayKey()
    const result = await collection.where({ openid: OPENID, dayKey: key }).orderBy("createdAt", "desc").limit(1).get()
    return { ok: true, record: result.data && result.data[0] ? result.data[0] : null }
  }

  return { ok: false, error: `Unsupported action: ${action}` }
}

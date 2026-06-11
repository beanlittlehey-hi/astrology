const cloud = require("wx-server-sdk")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = "diaries"

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

function normalizeDiary(diary = {}) {
  return {
    localId: diary.id || "",
    title: diary.title || "情绪日记",
    dateText: diary.date || diary.createdAt || "",
    sceneName: diary.sceneName || "综合",
    emotionTags: diary.emotionTags || [],
    emotionText: diary.emotionText || "",
    firstEmotion: diary.firstEmotion || "",
    moodClass: diary.moodClass || "",
    summary: diary.summary || "",
    userInput: diary.userInput || "",
    cardsText: diary.cardsText || "",
    suggestion: diary.suggestion || "",
    session: diary.session || null
  }
}

async function createDiary(collection, openid, diary) {
  const record = normalizeDiary(diary)
  const now = new Date()
  const created = await collection.add({
    data: {
      _openid: openid,
      openid,
      ...record,
      createdAt: now,
      updatedAt: now
    }
  })
  return { id: created._id }
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
    const result = await createDiary(collection, OPENID, payload.diary)
    return { ok: true, id: result.id }
  }

  if (action === "migrate") {
    const diaries = (payload.diaries || []).filter((item) => item && item.id && !String(item.id).startsWith("sample-"))
    const result = []
    for (let index = 0; index < diaries.length; index += 1) {
      const diary = diaries[index]
      const exists = await collection.where({ openid: OPENID, localId: diary.id }).limit(1).get()
      if (exists.data && exists.data.length) {
        result.push({ localId: diary.id, skipped: true, id: exists.data[0]._id })
      } else {
        const created = await createDiary(collection, OPENID, diary)
        result.push({ localId: diary.id, id: created.id })
      }
    }
    return { ok: true, migrated: result }
  }

  if (action === "list") {
    const result = await collection.where({ openid: OPENID }).orderBy("createdAt", "desc").limit(100).get()
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

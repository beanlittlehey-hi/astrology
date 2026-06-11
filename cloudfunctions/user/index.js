const cloud = require("wx-server-sdk")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = "users"

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

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action || "upsertProfile"
  const payload = event.payload || {}

  if (!OPENID) {
    return { ok: false, error: "OPENID is missing" }
  }

  if (action === "getOpenId") {
    return { ok: true, openid: OPENID }
  }

  if (action !== "upsertProfile") {
    return { ok: false, error: `Unsupported action: ${action}` }
  }

  await ensureCollection(COLLECTION)

  const profile = payload.profile || {}
  const now = new Date()
  const base = {
    _openid: OPENID,
    openid: OPENID,
    nickName: profile.nickName || "疗愈旅人",
    avatarUrl: profile.avatarUrl || "",
    lastLoginAt: now,
    updatedAt: now
  }

  const exist = await db.collection(COLLECTION).where({ openid: OPENID }).limit(1).get()
  if (exist.data && exist.data.length) {
    const id = exist.data[0]._id
    await db.collection(COLLECTION).doc(id).update({ data: base })
    return {
      ok: true,
      user: {
        ...exist.data[0],
        ...base,
        _id: id
      }
    }
  }

  const created = await db.collection(COLLECTION).add({
    data: {
      ...base,
      createdAt: now
    }
  })

  return {
    ok: true,
    user: {
      _id: created._id,
      ...base,
      createdAt: now
    }
  }
}

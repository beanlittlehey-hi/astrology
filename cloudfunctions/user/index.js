const cloud = require("wx-server-sdk")

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = "users"
const ADMIN_COLLECTION = "admin_users"

function openidShort(openid = "") {
  if (!openid) return ""
  return `${openid.slice(0, 6)}...${openid.slice(-4)}`
}

function maskPhone(phone = "") {
  const value = String(phone || "")
  if (value.length < 7) return value
  return `${value.slice(0, 3)}****${value.slice(-4)}`
}

function hashValue(value = "") {
  if (!value) return ""
  try {
    const crypto = require("crypto")
    return crypto.createHash("sha256").update(String(value)).digest("hex")
  } catch (error) {
    console.warn("hash failed", error)
    return ""
  }
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

async function isAdminIdentity(openid, phoneNumber, phoneHash) {
  await ensureCollection(ADMIN_COLLECTION)
  const collection = db.collection(ADMIN_COLLECTION)
  const enabledAdmin = { enabled: true, role: "admin" }

  if (openid) {
    const openidResult = await collection.where({
      ...enabledAdmin,
      type: "openid",
      openid
    }).limit(1).get()
    if (openidResult.data && openidResult.data.length) return true
  }

  if (phoneNumber) {
    const phoneResult = await collection.where({
      ...enabledAdmin,
      type: "phone",
      phoneNumber
    }).limit(1).get()
    if (phoneResult.data && phoneResult.data.length) return true
  }

  if (phoneHash) {
    const phoneHashResult = await collection.where({
      ...enabledAdmin,
      type: "phone",
      phoneHash
    }).limit(1).get()
    if (phoneHashResult.data && phoneHashResult.data.length) return true
  }

  return false
}

function summarizeUser(user = {}) {
  return {
    openid: user.openid || "",
    openidShort: user.openidShort || openidShort(user.openid),
    maskedPhone: user.maskedPhone || "",
    loginType: user.loginType || "openid",
    anonymousName: user.anonymousName || "月栖旅人",
    isAdmin: Boolean(user.isAdmin),
    role: user.role || "user",
    lastLoginAt: user.lastLoginAt || null
  }
}

async function upsertUser(openid, data = {}) {
  await ensureCollection(COLLECTION)
  const now = new Date()
  const profile = data.profile || {}
  const phoneNumber = data.phoneNumber || ""
  const phoneHash = data.phoneHash || (phoneNumber ? hashValue(phoneNumber) : "")
  const maskedPhone = data.maskedPhone || (phoneNumber ? maskPhone(phoneNumber) : "")
  const isAdmin = await isAdminIdentity(openid, phoneNumber, phoneHash)
  const existing = await db.collection(COLLECTION).where({ openid }).limit(1).get()
  const previous = existing.data && existing.data[0] ? existing.data[0] : null
  const loginCount = (previous && previous.loginCount ? previous.loginCount : 0) + 1
  const base = {
    _openid: openid,
    openid,
    openidShort: openidShort(openid),
    loginType: data.loginType || (phoneNumber ? "phone" : "openid"),
    phoneNumber: phoneNumber || (previous && previous.phoneNumber) || "",
    phoneHash: phoneHash || (previous && previous.phoneHash) || "",
    maskedPhone: maskedPhone || (previous && previous.maskedPhone) || "",
    countryCode: data.countryCode || (previous && previous.countryCode) || "",
    nickName: profile.nickName || (previous && previous.nickName) || "",
    avatarUrl: profile.avatarUrl || (previous && previous.avatarUrl) || "",
    anonymousName: profile.anonymousName || (previous && previous.anonymousName) || "月栖旅人",
    isAdmin,
    role: isAdmin ? "admin" : "user",
    loginCount,
    lastLoginAt: now,
    updatedAt: now,
    appVersion: data.appVersion || (previous && previous.appVersion) || "",
    deviceInfo: data.deviceInfo || (previous && previous.deviceInfo) || null,
    consentVersion: data.consentVersion || (previous && previous.consentVersion) || "2026-06-15"
  }

  if (previous) {
    await db.collection(COLLECTION).doc(previous._id).update({ data: base })
    return {
      ...previous,
      ...base,
      _id: previous._id,
      firstLoginAt: previous.firstLoginAt || previous.createdAt || now
    }
  }

  const created = await db.collection(COLLECTION).add({
    data: {
      ...base,
      firstLoginAt: now,
      createdAt: now
    }
  })

  return {
    _id: created._id,
    ...base,
    firstLoginAt: now,
    createdAt: now
  }
}

async function getPhoneInfo(code) {
  if (!code || !cloud.openapi || !cloud.openapi.phonenumber || !cloud.openapi.phonenumber.getPhoneNumber) {
    return null
  }
  const result = await cloud.openapi.phonenumber.getPhoneNumber({ code })
  return result && (result.phone_info || result.phoneInfo) ? result.phone_info || result.phoneInfo : null
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext()
  const action = event.action || "loginWithOpenId"
  const payload = event.payload || {}

  if (!OPENID) {
    return { ok: false, error: "OPENID is missing" }
  }

  if (action === "getOpenId") {
    return { ok: true, openid: OPENID, openidShort: openidShort(OPENID) }
  }

  if (action === "loginWithOpenId" || action === "upsertProfile") {
    const user = await upsertUser(OPENID, {
      ...payload,
      loginType: "openid"
    })
    return { ok: true, user: summarizeUser(user) }
  }

  if (action === "getCurrentUser") {
    await ensureCollection(COLLECTION)
    const result = await db.collection(COLLECTION).where({ openid: OPENID }).limit(1).get()
    if (result.data && result.data.length) {
      const user = result.data[0]
      return { ok: true, user: summarizeUser(user) }
    }
    const user = await upsertUser(OPENID, { loginType: "openid" })
    return { ok: true, user: summarizeUser(user) }
  }

  if (action === "loginWithPhone" || action === "bindPhone") {
    try {
      const phoneInfo = await getPhoneInfo(payload.code)
      if (!phoneInfo || !phoneInfo.phoneNumber) {
        return { ok: false, phoneUnavailable: true, error: "phone auth unavailable" }
      }
      const user = await upsertUser(OPENID, {
        ...payload,
        loginType: "phone",
        phoneNumber: phoneInfo.phoneNumber,
        countryCode: phoneInfo.countryCode || ""
      })
      return { ok: true, user: summarizeUser(user) }
    } catch (error) {
      console.warn("loginWithPhone failed", error)
      return { ok: false, phoneUnavailable: true, error: "phone auth unavailable" }
    }
  }

  if (action === "updateProfile") {
    const user = await upsertUser(OPENID, {
      ...payload,
      loginType: payload.loginType || "openid"
    })
    return { ok: true, user: summarizeUser(user) }
  }

  if (action === "logout") {
    return { ok: true }
  }

  return { ok: false, error: `Unsupported action: ${action}` }
}

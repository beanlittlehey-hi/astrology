const { isCloudReady } = require("../config/cloud")

function isAvailable() {
  return Boolean(isCloudReady() && wx.cloud && wx.cloud.callFunction)
}

async function callFunction(name, action, payload = {}) {
  if (!isAvailable()) {
    return {
      ok: false,
      localOnly: true,
      error: "Cloud env is not configured"
    }
  }

  try {
    const response = await wx.cloud.callFunction({
      name,
      data: {
        action,
        payload
      }
    })
    return response.result || { ok: true }
  } catch (error) {
    console.warn(`[cloudApi] ${name}.${action} failed`, error)
    return {
      ok: false,
      error: error && (error.errMsg || error.message) ? error.errMsg || error.message : String(error)
    }
  }
}

function upsertUser(profile = {}) {
  return callFunction("user", "upsertProfile", { profile })
}

function loginWithOpenId(payload = {}) {
  return callFunction("user", "loginWithOpenId", payload)
}

function loginWithPhone(code, payload = {}) {
  return callFunction("user", "loginWithPhone", {
    ...payload,
    code
  })
}

function getCurrentUser() {
  return callFunction("user", "getCurrentUser")
}

function createReading(session) {
  return callFunction("reading", "create", { session })
}

function listReadings() {
  return callFunction("reading", "list")
}

function getReading(id) {
  return callFunction("reading", "get", { id })
}

function createDiary(diary) {
  return callFunction("diary", "create", { diary })
}

function listDiaries() {
  return callFunction("diary", "list")
}

function getDiary(id) {
  return callFunction("diary", "get", { id })
}

function migrateDiaries(diaries = []) {
  return callFunction("diary", "migrate", { diaries })
}

function createDaily(record) {
  return callFunction("daily", "create", { record })
}

function listDailyCards() {
  return callFunction("daily", "list")
}

function getTodayDaily(dayKey) {
  return callFunction("daily", "getToday", { dayKey })
}

function analyzeReading(payload) {
  return callFunction("analysis", "analyzeReading", payload)
}

function analyzeDiaryEmotion(payload) {
  return callFunction("analysis", "analyzeDiaryEmotion", payload)
}

module.exports = {
  isAvailable,
  upsertUser,
  loginWithOpenId,
  loginWithPhone,
  getCurrentUser,
  createReading,
  listReadings,
  getReading,
  createDiary,
  listDiaries,
  getDiary,
  migrateDiaries,
  createDaily,
  listDailyCards,
  getTodayDaily,
  analyzeReading,
  analyzeDiaryEmotion
}

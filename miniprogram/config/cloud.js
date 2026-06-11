const CLOUD_ENV_ID = "cloud1-d0gos9q514515c33c"

const COLLECTIONS = {
  users: "users",
  readings: "readings",
  diaries: "diaries",
  dailyCards: "daily_cards"
}

function isCloudReady() {
  return Boolean(CLOUD_ENV_ID && CLOUD_ENV_ID !== "YOUR_CLOUD_ENV_ID")
}

module.exports = {
  CLOUD_ENV_ID,
  COLLECTIONS,
  isCloudReady
}

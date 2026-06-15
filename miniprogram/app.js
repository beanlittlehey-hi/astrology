const { CLOUD_ENV_ID, isCloudReady } = require("./config/cloud")

App({
  onLaunch() {
    if (isCloudReady() && wx.cloud) {
      wx.cloud.init({
        env: CLOUD_ENV_ID,
        traceUser: true
      })
    }
  },

  globalData: {
    appName: "月栖卡牌日记",
    cloudReady: isCloudReady()
  }
})

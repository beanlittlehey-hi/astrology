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
    appName: "塔罗疗愈之旅",
    cloudReady: isCloudReady()
  }
})

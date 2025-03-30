// app.js
App({
  onLaunch() {
    // 检查是否是首次使用
    this.checkFirstTimeUse();
  },

  checkFirstTimeUse() {
    const userInfo = wx.getStorageSync("userInfo");
    // 如果没有用户信息或没有完成引导，跳转到引导页
    if (!userInfo || !userInfo.hasCompleteGuide) {
      wx.redirectTo({
        url: "/pages/guide/guide",
      });
    }
  },

  globalData: {
    userInfo: null,
  },
});

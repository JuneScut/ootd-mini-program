Page({
  data: {
    currentSlide: 1,
    city: "",
    gender: "",
    description: "",
  },

  // 跳转到指定滑块
  goToSlide: function (e) {
    const slideNumber = parseInt(e.currentTarget.dataset.slide);

    // 验证当前步骤
    if (slideNumber === 3 && !this.data.city) {
      wx.showToast({
        title: "请输入您所在的城市",
        icon: "none",
      });
      return;
    }

    if (slideNumber === 4 && !this.data.gender) {
      wx.showToast({
        title: "请选择您的性别",
        icon: "none",
      });
      return;
    }

    // 更新当前滑块
    this.setData({
      currentSlide: slideNumber,
    });
  },

  // 设置城市
  setCity: function (e) {
    const city = e.currentTarget.dataset.city;
    this.setData({
      city: city,
    });
  },

  // 城市输入
  onCityInput: function (e) {
    this.setData({
      city: e.detail.value,
    });
  },

  // 选择性别
  selectGender: function (e) {
    const gender = e.currentTarget.dataset.gender;
    this.setData({
      gender: gender,
    });
  },

  // 描述输入
  onDescriptionInput: function (e) {
    this.setData({
      description: e.detail.value,
    });
  },

  // 完成引导
  completeOnboarding: function () {
    if (!this.data.description) {
      wx.showToast({
        title: "请输入您的穿衣风格偏好",
        icon: "none",
      });
      return;
    }

    // 保存用户信息到本地
    const userInfo = {
      city: this.data.city,
      gender: this.data.gender,
      description: this.data.description,
      hasCompleteGuide: true,
    };

    wx.setStorageSync("userInfo", userInfo);

    // 跳转到首页
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
});

Page({
  data: {
    // 用户信息
    username: "小张同学",
    motto: "OOTD爱好者",
    avatarUrl:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    // 个人信息
    city: "上海",
    gender: "女生",
    description: "喜欢甜酷风格，偏爱舒适的穿搭，通常会根据天气调整风格",

    // 设置
    weatherNotification: true,
  },

  onShow: function () {
    // 每次页面显示时刷新用户信息，确保数据最新
    this.getUserInfo();
  },

  onLoad: function () {
    // 页面加载时获取用户信息
    this.getUserInfo();
  },

  // 获取用户信息
  getUserInfo: function () {
    // 这里可以从缓存或服务器获取用户信息
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        city: userInfo.city || this.data.city,
        gender: userInfo.gender === "male" ? "男生" : "女生",
        description: userInfo.description || this.data.description,
      });
    }
  },

  // 编辑城市
  editCity: function () {
    // 使用更可靠的微信原生弹窗API
    wx.showActionSheet({
      itemList: ["北京", "上海", "广州", "深圳", "杭州", "其他城市"],
      success: (res) => {
        if (res.tapIndex !== undefined) {
          // 确保用户点击了某个选项而不是取消
          const cities = ["北京", "上海", "广州", "深圳", "杭州", "其他城市"];
          const selectedCity = cities[res.tapIndex];

          if (selectedCity === "其他城市") {
            this.showCityInput();
          } else {
            this.setData({
              city: selectedCity,
            });

            // 保存到本地
            this.saveUserInfo();

            // 显示成功提示
            wx.showToast({
              title: "城市已更新",
              icon: "success",
              duration: 1500,
            });
          }
        }
      },
      fail: (err) => {
        console.error("选择城市失败:", err);
        // 使用替代方案
        this.showCityInputAlternative();
      },
    });
  },

  // 备选方案 - 简单输入框
  showCityInputAlternative: function () {
    wx.showModal({
      title: "选择城市",
      content: "请选择或输入您所在的城市",
      confirmText: "确定",
      editable: true,
      placeholderText: "例如: 上海",
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            city: res.content,
          });
          this.saveUserInfo();
          wx.showToast({
            title: "城市已更新",
            icon: "success",
          });
        }
      },
    });
  },

  // 显示城市输入框
  showCityInput: function () {
    wx.showModal({
      title: "请输入城市名称",
      placeholderText: "例如：南京",
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            city: res.content,
          });

          // 保存到本地
          this.saveUserInfo();

          // 显示成功提示
          wx.showToast({
            title: "城市已更新",
            icon: "success",
            duration: 1500,
          });
        }
      },
    });
  },

  // 编辑性别
  editGender: function () {
    wx.showActionSheet({
      itemList: ["男生", "女生"],
      success: (res) => {
        if (!res.cancel) {
          const genders = ["男生", "女生"];
          this.setData({
            gender: genders[res.tapIndex],
          });

          // 保存到本地
          this.saveUserInfo();

          // 显示成功提示
          wx.showToast({
            title: "性别已更新",
            icon: "success",
            duration: 1500,
          });
        }
      },
    });
  },

  // 编辑个人描述
  editDescription: function () {
    wx.showModal({
      title: "编辑个人描述",
      content: this.data.description,
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            description: res.content,
          });

          // 保存到本地
          this.saveUserInfo();

          // 显示成功提示
          wx.showToast({
            title: "描述已更新",
            icon: "success",
            duration: 1500,
          });
        }
      },
    });
  },

  // 开关天气通知
  toggleWeatherNotification: function (e) {
    this.setData({
      weatherNotification: e.detail.value,
    });
  },

  // 保存用户信息到本地
  saveUserInfo: function () {
    let userInfo = wx.getStorageSync("userInfo") || {};
    userInfo = {
      ...userInfo,
      city: this.data.city,
      gender: this.data.gender === "男生" ? "male" : "female",
      description: this.data.description,
      hasCompleteGuide: true, // 确保标记已完成引导
    };

    wx.setStorageSync("userInfo", userInfo);
  },

  // 前往风格管理
  goToStyleManagement: function () {
    wx.showToast({
      title: "功能开发中",
      icon: "none",
    });
  },

  // 前往系统设置
  goToSystemSettings: function () {
    wx.showToast({
      title: "功能开发中",
      icon: "none",
    });
  },

  // 关于我们
  goToAboutUs: function () {
    wx.showToast({
      title: "功能开发中",
      icon: "none",
    });
  },

  // 帮助中心
  goToHelp: function () {
    wx.showToast({
      title: "功能开发中",
      icon: "none",
    });
  },

  // 评分鼓励
  goToRate: function () {
    wx.showToast({
      title: "感谢您的支持！",
      icon: "success",
    });
  },
});

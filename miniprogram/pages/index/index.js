// index.js
Page({
  data: {
    // 加载状态
    loading: true,

    // 城市与日期
    city: "上海",
    date: "2023年10月15日 星期日",

    // 天气信息
    temperature: 24,
    weatherDesc: "晴朗",
    weatherIcon: "☀️",
    windDirection: "东风",
    windLevel: "3级",
    humidity: "65%",
    uvLevel: "中等",

    // 周天气预报
    weeklyWeather: [
      { day: "今天", icon: "☀️", high: 24, low: 18 },
      { day: "周一", icon: "☁️", high: 22, low: 17 },
      { day: "周二", icon: "🌤", high: 21, low: 16 },
      { day: "周三", icon: "🌧", high: 19, low: 15 },
      { day: "周四", icon: "🌧", high: 18, low: 14 },
      { day: "周五", icon: "☁️", high: 20, low: 15 },
      { day: "周六", icon: "☀️", high: 22, low: 17 },
    ],

    // 穿搭风格
    styleOptions: [
      "甜酷风",
      "温柔风",
      "学院风",
      "韩系简约风",
      "设计师品牌风",
      "复古文艺风",
      "小香风",
      "森女系",
      "运动休闲风",
      "Y2K风",
    ],
    currentStyle: "甜酷风",

    // 弹窗状态
    showPopup: false,

    // OOTD建议
    ootdAdvice:
      "今天天气温暖，建议上身可选择短款白色T恤或宽松衬衫，下身可搭配高腰直筒牛仔裤或黑色短裤。鞋子可选择运动鞋或马丁靴，增加酷感。配饰方面，可选择帆布包和简约银饰来提升整体造型。",

    // 轮播图
    carouselItems: [
      "https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/9558759/pexels-photo-9558759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],

    // 当前天气数据(用于OOTD生成)
    currentWeatherData: null,

    ootdLoading: false,
  },

  onLoad: function () {
    // 页面加载时获取天气数据
    this.getCurrentWeather();

    // 获取用户性别来决定穿搭风格选项
    this.getUserGender();
  },

  onShow: function () {
    // 获取本地存储的城市信息
    const userInfo = wx.getStorageSync("userInfo") || {};
    const storedCity = userInfo.city || "上海";

    // 如果存储的城市与当前页面显示的城市不同，重新获取天气数据
    if (storedCity !== this.data.city) {
      console.log("城市已更新，重新获取天气数据", storedCity);
      this.getCurrentWeather();
    }

    // 检查是否需要更新穿搭风格选项
    this.getUserGender();
  },

  // 获取当前天气
  getCurrentWeather: function () {
    const self = this;

    // 先从缓存获取城市
    const userInfo = wx.getStorageSync("userInfo") || {};
    const city = userInfo.city || "上海";

    // 设置日期
    const today = new Date();
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const formattedDate = `${today.getFullYear()}年${
      today.getMonth() + 1
    }月${today.getDate()}日 星期${weekdays[today.getDay()]}`;

    this.setData({
      city: city,
      date: formattedDate,
      loading: true,
    });

    // 请求天气API
    wx.request({
      url: "https://ootd-server-qmjdgwq5u-junescuts-projects.vercel.app/api/weather",
      method: "POST",
      data: {
        city: city,
      },
      success: function (res) {
        if (
          res.statusCode === 200 &&
          res.data.data &&
          res.data.data.length > 0
        ) {
          const weatherData = res.data.data;
          const todayWeather = weatherData[0];

          // 设置天气图标
          const weatherIcons = {
            晴: "☀️",
            多云: "⛅",
            阴: "☁️",
            小雨: "🌦",
            中雨: "🌧",
            大雨: "🌧",
            暴雨: "⛈",
            雷阵雨: "⛈",
            阵雨: "🌦",
            雾: "🌫",
            雪: "❄️",
          };

          const icon = weatherIcons[todayWeather.weather_day] || "🌡️";

          // 设置周天气数据
          const weeklyData = weatherData.map((item, index) => {
            const date = new Date(item.predict_date);
            const dayName =
              index === 0 ? "今天" : `周${weekdays[date.getDay()]}`;

            return {
              day: dayName,
              icon: weatherIcons[item.weather_day] || "🌡️",
              high: item.temp_high,
              low: item.temp_low,
            };
          });

          // 更新页面数据
          self.setData({
            temperature: todayWeather.temp_high,
            weatherDesc: todayWeather.weather_day,
            weatherIcon: icon,
            windDirection: todayWeather.wind_dir_day,
            windLevel: `${todayWeather.wind_level_day}级`,
            humidity: `${todayWeather.humidity}%`,
            uvLevel: "中等", // API没有提供，使用默认值
            weeklyWeather: weeklyData,
            loading: false,
            currentWeatherData: todayWeather, // 保存当前天气数据用于OOTD生成
          });
        } else {
          wx.showToast({
            title: "获取天气失败",
            icon: "none",
          });
          self.setData({
            loading: false,
          });
        }
      },
      fail: function (err) {
        console.error("请求天气API失败:", err);
        wx.showToast({
          title: "网络错误",
          icon: "none",
        });
        self.setData({
          loading: false,
        });
      },
    });
  },

  // 获取用户性别
  getUserGender: function () {
    // 从用户信息中获取性别
    // 假设从缓存中获取
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo && userInfo.gender) {
      const styleOptions =
        userInfo.gender === "male"
          ? [
              "运动休闲风",
              "商务经营风",
              "日系潮流风",
              "韩系简约风",
              "学院风",
              "街头嘻哈风",
              "户外机能风",
              "复古文艺风",
              "极简主义风",
              "工装风",
            ]
          : [
              "甜酷风",
              "温柔风",
              "学院风",
              "韩系简约风",
              "设计师品牌风",
              "复古文艺风",
              "小香风",
              "森女系",
              "运动休闲风",
              "Y2K风",
            ];

      this.setData({
        styleOptions: styleOptions,
      });
    }
  },

  // 选择穿搭风格
  selectStyle: function (e) {
    const style = e.currentTarget.dataset.style;
    this.setData({
      currentStyle: style,
    });
  },

  // 显示OOTD弹窗
  showOOTDPopup: function () {
    // 先显示弹窗，并设置加载状态
    this.setData({
      showPopup: true,
      ootdLoading: true,
    });

    // 如果有当前天气数据，请求OOTD推荐
    if (this.data.currentWeatherData) {
      const userInfo = wx.getStorageSync("userInfo") || {};

      // 准备请求参数
      const ootdParams = {
        city: this.data.city,
        currentStyle: this.data.currentStyle,
        gender: userInfo.gender === "male" ? "男生" : "女生",
        description: userInfo.description || "",
        weather: this.data.currentWeatherData,
      };

      console.log("请求OOTD参数:", ootdParams);

      // 发起请求
      wx.request({
        url: "https://ootd-server-qmjdgwq5u-junescuts-projects.vercel.app/api/ootd",
        method: "POST",
        data: ootdParams,
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            console.log("OOTD接口返回:", res.data);

            // 更新OOTD数据
            this.setData({
              ootdAdvice: res.data.advice || this.data.ootdAdvice,
              carouselItems: res.data.output || this.data.carouselItems,
              ootdLoading: false,
            });
          } else {
            console.error("OOTD接口错误:", res);
            wx.showToast({
              title: "获取穿搭建议失败",
              icon: "none",
            });

            this.setData({
              ootdLoading: false,
            });
          }
        },
        fail: (err) => {
          console.error("请求OOTD API失败:", err);
          wx.showToast({
            title: "网络错误",
            icon: "none",
          });

          this.setData({
            ootdLoading: false,
          });
        },
      });
    } else {
      // 没有天气数据，使用默认值
      console.warn("无当前天气数据，使用默认值");

      // 3秒后结束加载动画，模拟请求过程
      setTimeout(() => {
        this.setData({
          ootdLoading: false,
        });
      }, 3000);
    }
  },

  // 隐藏OOTD弹窗
  hideOOTDPopup: function () {
    this.setData({
      showPopup: false,
    });
  },

  // 点击弹窗背景
  onPopupBackdropClick: function () {
    this.hideOOTDPopup();
  },

  // 阻止事件冒泡
  stopPropagation: function (e) {
    return;
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.getCurrentWeather();
    wx.stopPullDownRefresh();
  },
});

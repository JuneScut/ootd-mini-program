Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    temperature: {
      type: Number,
      value: 0,
    },
    weatherDesc: {
      type: String,
      value: "",
    },
    styleType: {
      type: String,
      value: "",
    },
    ootdAdvice: {
      type: String,
      value: "",
    },
    carouselItems: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    startY: 0,
    moveY: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹窗
    closePopup: function () {
      this.triggerEvent("close");
    },

    // 点击背景关闭
    onPopupBackdropClick: function () {
      this.closePopup();
    },

    // 阻止冒泡
    stopPropagation: function () {
      return;
    },

    // 轮播图变化
    onSwiperChange: function (e) {
      this.setData({
        currentIndex: e.detail.current,
      });
    },

    // 处理触摸开始
    handleTouchStart: function (e) {
      this.setData({
        startY: e.touches[0].clientY,
      });
    },

    // 处理触摸移动
    handleTouchMove: function (e) {
      const moveY = e.touches[0].clientY - this.data.startY;

      // 只允许向下滑动
      if (moveY > 0) {
        this.setData({
          moveY: moveY,
        });
      }
    },

    // 处理触摸结束
    handleTouchEnd: function () {
      // 如果下滑距离超过50px，关闭弹窗
      if (this.data.moveY > 50) {
        this.closePopup();
      }

      // 重置移动距离
      this.setData({
        moveY: 0,
      });
    },

    // 应用移动样式
    applyMoveStyle: function (distance) {
      const contentElement = this.selectComponent(".popup-content");
      if (contentElement) {
        contentElement.setStyle({
          transform: `translateY(${distance}px)`,
          transition: "none",
        });
      } else {
        // 如果无法使用selectComponent，使用样式变量
        const contentDom = this.createSelectorQuery()
          .select(".popup-content")
          .node();
        if (contentDom && contentDom.style) {
          contentDom.style.transform = `translateY(${distance}px)`;
          contentDom.style.transition = "none";
        }
      }
    },

    // 重置移动样式
    resetMoveStyle: function () {
      const contentElement = this.selectComponent(".popup-content");
      if (contentElement) {
        contentElement.setStyle({
          transform: "translateY(0)",
          transition: "transform 0.3s ease-out",
        });
      } else {
        // 如果无法使用selectComponent，使用样式变量
        const contentDom = this.createSelectorQuery()
          .select(".popup-content")
          .node();
        if (contentDom && contentDom.style) {
          contentDom.style.transform = "translateY(0)";
          contentDom.style.transition = "transform 0.3s ease-out";
        }
      }
    },
  },
});

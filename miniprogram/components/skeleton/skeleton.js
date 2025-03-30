Component({
  properties: {
    loading: {
      type: Boolean,
      value: true,
    },
    type: {
      type: String,
      value: "weather", // 可选值: 'weather', 'weekly'
    },
  },
});

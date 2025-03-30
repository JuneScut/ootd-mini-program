const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 天气API
app.post("/api/weather", async (req, res) => {
  try {
    console.log("请求天气API", req.body);
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: "城市参数不能为空" });
    }

    const response = await axios.post(
      "https://api.coze.cn/v1/workflow/run",
      {
        parameters: {
          city,
        },
        workflow_id: process.env.WEATHER_WORKFLOW_ID,
        app_id: process.env.APP_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COZE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 处理Coze返回的数据
    if (response.data && response.data.code === 0) {
      const weatherData = JSON.parse(response.data.data);
      return res.json(weatherData);
    } else {
      return res
        .status(500)
        .json({ error: "获取天气数据失败", details: response.data });
    }
  } catch (error) {
    console.error("天气API错误:", error);
    return res
      .status(500)
      .json({ error: "服务器错误", details: error.message });
  }
});

// OOTD API
app.post("/api/ootd", async (req, res) => {
  try {
    const { city, currentStyle, gender, description, weather } = req.body;

    if (!city || !currentStyle || !weather) {
      return res.status(400).json({ error: "参数不完整" });
    }

    console.log("请求OOTD参数:", {
      city,
      currentStyle,
      gender,
      description,
      weather,
    });

    const response = await axios.post(
      "https://api.coze.cn/v1/workflow/run",
      {
        parameters: {
          city,
          currentStyle,
          gender: gender || "女生",
          description: description || "",
          weather,
        },
        workflow_id: process.env.OOTD_WORKFLOW_ID,
        app_id: process.env.APP_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COZE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 处理Coze返回的数据
    if (response.data && response.data.code === 0) {
      const ootdData = JSON.parse(response.data.data);
      console.log("OOTD API返回:", ootdData);
      return res.json(ootdData);
    } else {
      console.error("OOTD API错误响应:", response.data);
      return res
        .status(500)
        .json({ error: "获取OOTD数据失败", details: response.data });
    }
  } catch (error) {
    console.error("OOTD API错误:", error);
    return res
      .status(500)
      .json({ error: "服务器错误", details: error.message });
  }
});

// 健康检查
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

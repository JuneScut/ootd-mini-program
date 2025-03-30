# 1. 请求天气 API

- 请求方式
  
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_kXFOjWNRTgDP4unfpcCTaSEMFKRwlwlmaNpgDgcxT8Ug38GVhdfcnNgXzGcE9nYc" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "city": "深圳市"
  },
  "workflow_id": "7487499257022480394",
  "app_id": "7487457814160752692"
}'
```

- 返回值

```json
{"code":0,"cost":"0","data":"{\"data\":[{\"condition\":\"阵雨\",\"humidity\":73,\"predict_date\":\"2025-03-30\",\"temp_high\":14,\"temp_low\":10,\"weather_day\":\"阵雨\",\"wind_dir_day\":\"东北风\",\"wind_dir_night\":\"东北风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"多云\",\"humidity\":73,\"predict_date\":\"2025-03-31\",\"temp_high\":17,\"temp_low\":13,\"weather_day\":\"多云\",\"wind_dir_day\":\"东北风\",\"wind_dir_night\":\"东北风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"晴\",\"humidity\":66,\"predict_date\":\"2025-04-01\",\"temp_high\":22,\"temp_low\":14,\"weather_day\":\"晴\",\"wind_dir_day\":\"东北风\",\"wind_dir_night\":\"东北风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"晴\",\"humidity\":61,\"predict_date\":\"2025-04-02\",\"temp_high\":24,\"temp_low\":15,\"weather_day\":\"晴\",\"wind_dir_day\":\"西南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"1\"},{\"condition\":\"晴\",\"humidity\":61,\"predict_date\":\"2025-04-03\",\"temp_high\":25,\"temp_low\":17,\"weather_day\":\"晴\",\"wind_dir_day\":\"东南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"},{\"condition\":\"多云\",\"humidity\":63,\"predict_date\":\"2025-04-04\",\"temp_high\":24,\"temp_low\":19,\"weather_day\":\"多云\",\"wind_dir_day\":\"东南风\",\"wind_dir_night\":\"东南风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"1\"},{\"condition\":\"小雨\",\"humidity\":68,\"predict_date\":\"2025-04-05\",\"temp_high\":25,\"temp_low\":19,\"weather_day\":\"小雨\",\"wind_dir_day\":\"东南风\",\"wind_dir_night\":\"东北风\",\"wind_level_day\":\"2\",\"wind_level_night\":\"2\"}]}","debug_url":"https://www.coze.cn/work_flow?execute_id=7487537853662314537&space_id=7485024022221160485&workflow_id=7487499257022480394&execute_mode=2","msg":"Success","token":0}
```


# 2. OOTD API

- 请求方式
  
```bash
curl -X POST 'https://api.coze.cn/v1/workflow/run' \
-H "Authorization: Bearer pat_kXFOjWNRTgDP4unfpcCTaSEMFKRwlwlmaNpgDgcxT8Ug38GVhdfcnNgXzGcE9nYc" \
-H "Content-Type: application/json" \
-d '{
  "parameters": {
    "city": "深圳市",
    "currentStyle": "日系",
    "gender": "女生",
    "description": "喜欢简约风格，长头发",
    "weather": {
      "condition": "阵雨",
      "humidity": 74,
      "predict_date": "2025-03-30",
      "temp_high": 14,
      "temp_low": 10,
      "weather_day": "阵雨",
      "wind_dir_day": "东北风",
      "wind_dir_night": "东北风",
      "wind_level_day": "2",
      "wind_level_night": "2"
    }
  },
  "workflow_id": "7487503786649485364",
  "app_id": "7487457814160752692"
}'
```

- 返回值

```json
{"code":0,"cost":"0","data":"{\"advice\":\"鉴于深圳的阵雨天气和 10 - 14℃的气温，为你设计日系简约风穿搭。上衣选一件燕麦色的宽松风衣，经典百搭又能抵御风雨，内搭一件白色的基础款针织衫，干净清爽。下装搭配一条黑色的直筒裤，利落又显瘦。脚穿一双深棕色的马丁靴，增添酷感。整体颜色以暖色调的燕麦色、白色搭配经典的黑色、深棕色，营造出温暖又沉稳的氛围，契合日系风格。简约的款式加上你飘逸的长发，尽显清新自然的气质，既适合雨天出行，又符合你的简约喜好。\",\"output\":[\"https://s.coze.cn/t/A8VG71FfhfM/\",\"https://s.coze.cn/t/vc3kBDEgFwk/\",\"https://s.coze.cn/t/BQAGc-aI-JI/\"]}","debug_url":"https://www.coze.cn/work_flow?execute_id=7487539545899253795&space_id=7485024022221160485&workflow_id=7487503786649485364&execute_mode=2","msg":"Success","token":1689}
```
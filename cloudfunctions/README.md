# 微信云开发接入说明

## 1. 开通云开发

1. 在微信开发者工具顶部点击云形图标，进入云开发控制台。
   成功标志：能看到云开发控制台页面。

2. 如果页面提示“开通微信云开发”，需要先按你的腾讯云账户情况开通环境。
   成功标志：控制台左上角出现环境名称和环境 ID。

注意：开通页面可能涉及腾讯云账户、套餐和扣款设置，这一步需要你本人确认。

## 2. 填写环境 ID

打开 `miniprogram/config/cloud.js`，把：

```js
const CLOUD_ENV_ID = ""
```

改成云开发控制台显示的环境 ID，例如：

```js
const CLOUD_ENV_ID = "your-env-id"
```

成功标志：小程序启动时会执行 `wx.cloud.init`，后续保存记录会尝试写入云端。

## 3. 创建数据库集合

在云开发控制台的数据库里创建 4 个集合：

- `users`
- `readings`
- `diaries`
- `daily_cards`

集合权限建议保持默认安全配置，不要设置成公开读写。当前小程序端不直接写数据库，所有读写都走云函数，并用 `OPENID` 隔离用户数据。

成功标志：数据库左侧能看到这 4 个集合。

## 4. 上传并部署云函数

在微信开发者工具左侧展开 `cloudfunctions/`，分别右键以下目录，选择“上传并部署：云端安装依赖”：

- `user`
- `reading`
- `diary`
- `daily`
- `analysis`

成功标志：云开发控制台的云函数列表能看到这 5 个函数。

## 5. 配置 DeepSeek 官网 API

`analysis` 云函数会通过 DeepSeek 官网 API 调用 `deepseek-v4-pro`，用于根据用户问题和抽中的塔罗牌生成测算解读，并根据用户日记文本做情绪关联分析。

1. 打开 DeepSeek 开放平台，创建你自己的 API Key。
   成功标志：拿到以 `sk-` 开头的密钥。

2. 在微信开发者工具 / 云开发控制台里，为 `analysis` 云函数配置环境变量：
   - `DEEPSEEK_API_KEY`：你的 DeepSeek API Key。
   - `DEEPSEEK_MODEL`：可选，默认 `deepseek-v4-pro`。如果你之前填过 `deepseek-chat`，请改成 `deepseek-v4-pro`，否则会覆盖代码默认值。
   - `DEEPSEEK_API_URL`：可选，默认 `https://api.deepseek.com/chat/completions`。
   - `DEEPSEEK_DAILY_BUDGET_CNY`：可选，默认 `1`，表示每日 DeepSeek 调用预算 1 元人民币。
   - `DEEPSEEK_USD_TO_CNY`：可选，默认 `7.3`，用于把 DeepSeek 美元计费估算成人民币。
   - `DEEPSEEK_THINKING`：可选，默认 `disabled`。如需开启 V4-Pro 思考模式，填 `enabled`。
   - `DEEPSEEK_REASONING_EFFORT`：可选，默认 `high`，仅在 `DEEPSEEK_THINKING=enabled` 时生效。
   - `DEEPSEEK_MAX_TOKENS`：可选，默认 `1000`，限制每次返回内容长度。

成功标志：`analysis` 云函数调用成功返回 `ok: true`。

如果 API Key 未配置或接口失败，小程序会继续使用本地模板兜底，不会影响前端测试。

`analysis` 会把每日 AI 调用消耗记录到 `ai_usage_daily` 集合。调用前会按最坏情况预估本次消耗，预计超过每日预算时直接停止调用 DeepSeek，并让小程序使用本地兜底解读。

当前默认按 DeepSeek V4-Pro 官方价格估算成本：

- 缓存命中输入：`$0.003625 / 1M tokens`
- 缓存未命中输入：`$0.435 / 1M tokens`
- 输出：`$0.87 / 1M tokens`

## 6. 验证

1. 重新编译小程序并登录。
   成功标志：`users` 集合出现当前微信用户记录。

2. 完成一次测算并进入结果页。
   成功标志：结果页文案能回应用户实际输入的问题，`readings` 集合出现测算记录。

3. 点击保存日记。
   成功标志：情绪标签和摘要能结合用户补充文本与塔罗结论，`diaries` 集合出现情绪日记记录。

4. 保存今日单张牌日记。
   成功标志：`daily_cards` 和 `diaries` 集合都有对应记录。

如果云端失败，小程序仍会保留本地缓存，不影响前端继续测试。

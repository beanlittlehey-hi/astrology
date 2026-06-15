# 微信真实登录、OPENID 管理员体系与管理端 UI 改造提示词

请将当前小程序从“模拟登录”升级为“微信真实身份登录体系”，并新增管理端 UI 与管理员白名单能力。登录识别做两手准备：优先支持微信手机号授权登录；如果手机号能力因认证、付费或接口权限暂不可用，则必须能退回到 OPENID 登录体系。管理员识别也支持手机号和 OPENID 两种方式。

## 背景

当前项目已有微信云开发环境：

- `miniprogram/config/cloud.js` 已配置 `CLOUD_ENV_ID`
- 前端通过 `miniprogram/services/cloudApi.js` 调用云函数
- 现有云函数包括 `user`、`diary`、`reading`、`daily`、`analysis`
- 当前用户隔离主要依赖云函数中的 `cloud.getWXContext().OPENID`
- 当前前端登录仍接近模拟登录：`wx.login` 成功后设置本地 `loggedIn: true`
- 现在需要升级为真实微信身份体系，并让用户能在个人信息界面看到自己的 `openid`，方便我把管理员账号加入白名单

## 重要原则

1. 优先使用手机号授权登录，但不能强依赖手机号。
2. 如果手机号能力不可用，必须支持 OPENID 登录。
3. 云端数据隔离始终以 `OPENID` 为第一安全边界。
4. 管理员白名单支持手机号和 `openid`。
5. 用户个人信息界面必须展示自己的 `openid`，方便我复制给 Codex 添加管理员。
6. 不要改顶部导航栏、标题栏、底部 tab、整体背景视觉。
7. 不要破坏现有抽牌、单张卡牌、情绪日记、报告查看流程。
8. 不要把 AppSecret、AccessToken、管理员敏感信息写进前端。
9. 所有敏感数据访问必须走云函数。
10. 实施前必须读取真实源码，不要凭记忆改。

## 一、登录策略

登录体系分两种模式。

### A. 手机号授权登录，可用时优先

- 前端登录按钮使用：
  - `button open-type="getPhoneNumber"`
  - `bindgetphonenumber`
- 用户同意授权后，前端拿 `e.detail.code`
- 调用云函数：`user.loginWithPhone`
- 云函数使用手机号授权 code 换取手机号
- 同时通过 `cloud.getWXContext()` 获取 `OPENID`
- upsert 用户记录
- 返回用户摘要

### B. OPENID 登录，兜底方案

- 如果手机号接口不可用、用户暂时拒绝手机号、或当前小程序主体暂不满足手机号能力：
  - 前端提供“使用微信身份继续”或“暂不绑定手机号继续”的入口
- 调用云函数：`user.loginWithOpenId`
- 云函数通过 `cloud.getWXContext()` 获取当前用户 `OPENID`
- upsert 用户记录
- 返回用户摘要
- OPENID 登录用户也可以正常使用日记、测算、单张卡牌等功能
- 后续可在个人信息页补充手机号绑定

注意：

- `wx.login` 的 code 和 `getPhoneNumber` 的 code 不是同一个东西，不能混用。
- 无论手机号登录还是 OPENID 登录，云端数据写入和查询都必须绑定当前 `OPENID`。
- 前端本地 `loggedIn` 只能作为 UI 状态，不能作为安全边界。

## 二、用户表设计

完善 `users` 集合：

```js
{
  _openid,
  openid,
  openidShort,
  loginType,          // "phone" | "openid"
  phoneNumber,        // 可选，仅手机号登录成功后保存，普通前端不展示完整手机号
  phoneHash,
  maskedPhone,
  countryCode,
  nickName,
  avatarUrl,
  anonymousName,
  isAdmin,
  role,               // "user" | "admin"
  loginCount,
  firstLoginAt,
  lastLoginAt,
  createdAt,
  updatedAt,
  appVersion,
  deviceInfo,
  consentVersion
}
```

返回给普通前端的用户摘要：

```js
{
  openid,
  openidShort,
  maskedPhone,
  loginType,
  anonymousName,
  isAdmin,
  role,
  lastLoginAt
}
```

说明：

- 因为用户明确需要在个人信息界面查看自己的 `openid`，所以可以把自己的 `openid` 返回给当前用户本人。
- 不允许普通用户查看其他人的 `openid`。
- 管理端可以查看用户 `openid`，但必须管理员权限校验通过。

## 三、个人信息界面

在现有个人信息、设置或侧边栏区域增加用户信息展示。

普通用户可看到：

- 当前登录方式：
  - 手机号登录
  - 微信身份登录
- `maskedPhone`，如果有
- `openid`
- `openidShort`
- 复制 `openid` 按钮
- 退出登录按钮

要求：

- 用户可以一键复制自己的 `openid` 到剪贴板：

```js
wx.setClipboardData({ data: user.openid })
```

- 复制成功提示：“openid 已复制”
- 如果手机号未绑定，显示“未绑定手机号”
- 可选按钮：“绑定手机号”
- 不要在普通用户界面展示管理员功能，除非 `isAdmin === true`

## 四、管理员白名单

新增集合 `admin_users`：

```js
{
  type,          // "phone" | "openid"
  phoneNumber,
  phoneHash,
  maskedPhone,
  openid,
  openidShort,
  role: "admin",
  enabled: true,
  remark,
  createdAt,
  updatedAt,
  createdBy
}
```

管理员识别逻辑：

- 用户登录成功后，云函数检查 `admin_users`
- 如果手机号登录，先匹配手机号或 `phoneHash`
- 无论哪种登录，都匹配 `openid`
- 只要有一条记录满足：
  - `enabled === true`
  - `role === "admin"`
  - `type` 和值匹配
- 则设置：
  - `users.isAdmin = true`
  - `users.role = "admin"`
- 否则：
  - `users.isAdmin = false`
  - `users.role = "user"`

添加管理员方式：

- 先实现基于 `openid` 的管理员白名单最小闭环
- 用户在个人信息页复制自己的 `openid`
- 我在 Codex 里提供 `openid`，请你把它加入管理员白名单
- 如果后续手机号可用，再支持手机号加入管理员白名单

要求：

- 普通前端不能直接写 `admin_users`
- 管理员添加可以通过：
  1. 云开发控制台手动插入
  2. Codex 提供 seed 脚本
  3. 已有管理员调用 `admin.addAdminIdentity`
- 初始阶段优先提供清晰文档，说明如何把一个 `openid` 加成管理员

## 五、user 云函数改造

扩展 `cloudfunctions/user/index.js`。

新增 actions：

- `loginWithOpenId`
- `loginWithPhone`
- `getCurrentUser`
- `bindPhone`
- `updateProfile`
- `logout` 可选

`loginWithOpenId`：

- 获取 `OPENID`
- upsert `users`
- 检查 `admin_users` 是否有当前 `openid`
- 写登录日志
- 返回用户摘要

`loginWithPhone`：

- 获取 `OPENID`
- 使用手机号授权 code 换手机号
- upsert `users`
- 检查手机号和 `openid` 是否命中管理员白名单
- 写登录日志
- 返回用户摘要

如果手机号接口不可用：

- 返回明确错误：

```js
{ ok: false, phoneUnavailable: true, error: "phone auth unavailable" }
```

- 前端可以提示用户改用 OPENID 登录

## 六、前端登录 UI

启动页登录弹层调整为两个入口：

主按钮：

- “手机号登录”
- 使用 `open-type="getPhoneNumber"`
- 成功后调用 `user.loginWithPhone`

次按钮：

- “使用微信身份继续”
- 调用 `user.loginWithOpenId`
- 用于手机号能力不可用或用户不想授权手机号时继续使用

提示文案：

- “手机号用于账号识别和数据找回；如暂不授权，也可使用微信身份继续。”
- “使用微信身份继续时，系统会通过微信 openid 隔离你的数据。”

拒绝手机号授权：

- 不要卡死
- 提示：“你可以稍后绑定手机号，也可以使用微信身份继续。”
- 保留 OPENID 登录入口

登录成功后：

- 保存：
  - `loggedIn: true`
  - `user`
  - `isAdmin`
- 调用云端同步日记
- 如果 `isAdmin` 为 true，显示管理端入口

## 七、使用日志体系

新增集合 `usage_events`：

```js
{
  _openid,
  openid,
  openidShort,
  phoneHash,
  maskedPhone,
  loginType,
  eventType,
  eventName,
  screen,
  payload,
  createdAt,
  appVersion,
  deviceInfo
}
```

新增云函数：`cloudfunctions/usage`

actions：

- `track`
- `batchTrack`

关键埋点：

- `app_launch`
- `login_openid_success`
- `login_phone_success`
- `login_phone_fail`
- `copy_openid`
- `page_view`
- `tab_click`
- `daily_card_reveal`
- `reading_start`
- `reading_complete`
- `diary_create`
- `report_open`
- `admin_page_view`
- `cloud_error`

要求：

- 日志失败不影响主流程
- 不弹 toast，只 `console.warn`

## 八、管理端云函数

新增：`cloudfunctions/admin`

所有 action 开头必须 `assertAdmin()`。

`assertAdmin()`：

- 获取当前 `OPENID`
- 查询 `users`
- 查询 `admin_users`
- 必须满足：
  - 当前 `openid` 在 `admin_users` 中 enabled
  - 或当前用户手机号/phoneHash 在 `admin_users` 中 enabled
  - 且 `users.isAdmin === true`
- 不满足返回：

```js
{ ok: false, error: "permission denied" }
```

admin actions：

- `getDashboard`
- `listUsers`
- `getUserDetail`
- `listUsageEvents`
- `listDiaries`
- `listReadings`
- `listDailyCards`
- `getUserTimeline`
- `addAdminIdentity`
- `disableAdminIdentity`

分页：

- 默认 `pageSize: 20`
- 最大 `pageSize: 100`
- 支持按以下字段筛选：
  - `openid`
  - `openidShort`
  - `maskedPhone`
  - 手机号后四位
  - 日期范围
  - `eventName`
  - `loginType`

## 九、管理端 UI

在小程序内新增隐藏管理端 UI。

入口：

- 登录后，如果 `user.isAdmin === true`：
  - 在个人信息/设置/侧边栏显示“管理后台”
- 普通用户完全不可见
- 不新增底部 tab
- 不影响现有首页、测算、日记页面

管理首页展示：

- 总用户数
- 今日活跃用户
- 今日登录次数
- 今日测算次数
- 今日日记数
- 今日单张卡牌次数
- 最近错误日志
- 最近 7 日趋势简表

管理页：

1. 用户列表
   - `openidShort`
   - `maskedPhone`
   - `loginType`
   - `role`
   - `lastLoginAt`
   - `loginCount`
   - `diariesCount`
   - `readingsCount`
   - `dailyCardsCount`
2. 用户详情
   - `openid`
   - `maskedPhone`
   - `loginType`
   - 角色
   - 最近登录
   - 测算记录
   - 情绪日记
   - 单张卡牌
   - 使用日志
3. 使用日志
   - `eventName`
   - `screen`
   - `createdAt`
   - `openidShort`
   - `maskedPhone`
   - `payload` 摘要
4. 管理员身份管理
   - 列出 `admin_users`
   - 添加 `openid` 为管理员
   - 如果手机号能力可用，添加手机号为管理员
   - 禁用管理员身份

UI 要求：

- 保持当前视觉风格
- 不改导航冻结规则
- 不新增大图片资源
- 以功能可用和信息密度清晰为主

## 十、数据隔离

普通用户：

- `diary`、`reading`、`daily`、`usage` 所有写入都带当前 `OPENID`
- list/get/update/delete 必须按当前 `OPENID` 过滤
- 单条 get 即使传 `_id`，也要校验 `record.openid === OPENID`
- 前端不能直接读数据库全量数据

管理员：

- 只能通过 `admin` 云函数查看全量数据
- `admin` 云函数必须先通过管理员白名单校验
- 管理员查询必须分页
- 管理员查看敏感信息要写入 `usage_events`，例如：
  - `admin_view_user_detail`
  - `admin_view_sensitive_phone`

## 十一、本地数据迁移

当前本地模拟登录数据需要迁移：

- 如果用户本地已有 diaries：
  - 登录成功后迁移一次到云端
- 如果是 OPENID 登录：
  - migration key 使用：

```js
`${STORAGE_KEY}_cloud_migrated_${openid}`
```

- 如果是手机号登录：
  - migration key 可以使用：

```js
`${STORAGE_KEY}_cloud_migrated_${phoneHash || openid}`
```

- 退出登录：
  - 清本地登录态
  - 不删除云端数据
- 注销账号：
  - 后续单独设计，不和退出登录混用

## 十二、隐私与合规

更新登录提示和隐私说明：

- 手机号用于账号识别、数据找回和管理员识别
- 如果不授权手机号，也可以使用微信 openid 继续
- openid 用于隔离你的数据
- 使用日志用于产品体验优化
- 不采集通讯录、精准定位、身份证等非必要信息
- 情绪日记和测算内容属于敏感用户内容，管理员查看仅用于问题排查和产品优化
- 上线前需要同步更新小程序隐私政策

## 十三、实施步骤

请分阶段实施，每阶段小改、小验证、小提交。

### 阶段 1：真实 OPENID 登录最小闭环

- 扩展 `user.loginWithOpenId`
- 前端登录支持“使用微信身份继续”
- 个人信息界面展示 `openid` 和复制按钮
- `users` 集合 upsert 当前用户
- 保持现有业务流程可用

### 阶段 2：管理员 OPENID 白名单

- 新增 `admin_users`
- 新增 admin 云函数
- 支持通过 `openid` 判断管理员
- 登录后返回 `isAdmin`
- 管理入口仅管理员可见

### 阶段 3：管理端 UI 最小版

- dashboard
- 用户列表
- 用户详情
- 使用日志入口可以先占位或接入最小列表

### 阶段 4：使用日志

- 新增 `usage` 云函数
- 前端 `trackEvent`
- 接入关键事件

### 阶段 5：手机号登录可选能力

- 增加 `loginWithPhone`
- 增加 `bindPhone`
- 手机号可用时优先手机号登录
- 手机号不可用时 OPENID 登录不受影响

## 十四、验证命令

```bash
node --check miniprogram/pages/index/index.js
node --check miniprogram/services/cloudApi.js
node --check cloudfunctions/user/index.js
node --check cloudfunctions/admin/index.js
node --check cloudfunctions/usage/index.js
node --check cloudfunctions/diary/index.js
node --check cloudfunctions/reading/index.js
node --check cloudfunctions/daily/index.js
python3 -m json.tool project.config.json >/dev/null
python3 -m json.tool miniprogram/app.json >/dev/null
git diff --check
```

微信开发者工具验证：

- 预览二维码生成成功
- 使用 OPENID 登录能进入首页
- 个人信息页能看到自己的 `openid`
- 点击复制 `openid` 成功
- `users` 集合出现当前用户
- 普通用户看不到管理入口
- 把当前用户 `openid` 加入 `admin_users` 后，重新登录能看到管理入口
- 管理员能打开管理端 dashboard
- 普通用户直接调用 admin 云函数返回 `permission denied`
- 日记、测算、单张卡牌仍按当前用户隔离
- 手机号登录如当前环境不可用，应优雅降级到 OPENID 登录

## 十五、Git 规则

- 不提交密钥、token、AppSecret、access_token
- 不提交 `project.private.config.json`、`.env*`、`output/`、`tmp/`
- 每阶段更新 `docs/ITERATION_LOG.md`
- 每阶段本地 commit
- push 前等待确认

## 建议执行范围

建议主线程先只做阶段 1 和阶段 2：

1. 让每个用户能看到并复制自己的 `openid`
2. 支持把指定 `openid` 加入管理员白名单
3. 登录后按 `openid` 判断是否管理员

手机号能力可以后置，避免当前登录链路被认证、付费或权限问题卡住。

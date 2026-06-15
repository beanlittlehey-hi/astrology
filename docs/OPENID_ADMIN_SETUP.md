# OPENID 登录与管理员白名单设置

## 当前实现阶段

- 已支持真实微信身份登录：前端调用 `user.loginWithOpenId`，云函数通过 `cloud.getWXContext().OPENID` 获取当前用户身份。
- 已保留手机号登录入口：前端使用 `open-type="getPhoneNumber"`，如接口权限不可用，前端提示改用微信身份继续。
- 用户数据隔离继续以云函数里的 `OPENID` 为第一边界。
- 个人侧边栏会展示当前用户的 `openid`、`openidShort`、登录方式和手机号绑定状态，并支持复制 `openid`。

## 添加 OPENID 管理员

1. 用目标微信账号进入小程序，选择“使用微信身份继续”。
2. 在首页点击左上个人入口，打开侧边栏。
3. 点击“复制 openid”，拿到当前账号的 `openid`。
4. 在微信云开发控制台手动打开数据库集合 `admin_users`。
5. 新增一条记录：

```json
{
  "type": "openid",
  "openid": "替换为复制出来的 openid",
  "openidShort": "可选，便于识别",
  "role": "admin",
  "enabled": true,
  "remark": "初始管理员",
  "createdAt": "控制台可填当前时间",
  "updatedAt": "控制台可填当前时间",
  "createdBy": "manual"
}
```

6. 退出小程序后重新登录。登录成功后云函数会重新检查 `admin_users`，命中后返回 `isAdmin: true`。

## 注意

- 不要把 AppSecret、AccessToken 或管理员敏感信息写进前端。
- 普通用户不能直接写 `admin_users`。
- 当前管理端 UI 仍未实现完整后台；本阶段只完成真实 OPENID 登录、个人 openid 展示复制和管理员白名单识别基础。

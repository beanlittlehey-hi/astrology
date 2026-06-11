# Claude Code 接手规则

本仓库的 `main` 分支是「月息塔罗」微信小程序当前可信版本源。不要依赖聊天长上下文、旧截图描述或本地未合并分支来判断代码现状。

## 每次任务开始

先执行下面两条命令，确认自己站在正确版本上：

```bash
git status --short --branch
git log --oneline --decorate -n 5
```

成功标志：

- 工作区没有无关未提交改动，或你能明确说明这些改动来自哪里。
- 当前分支包含最新的 `origin/main`。

然后阅读这些文件：

- `README.md`
- `docs/ITERATION_LOG.md`
- `miniprogram/pages/index/index.wxml`
- `miniprogram/pages/index/index.wxss`
- `miniprogram/pages/index/index.js`

## 项目事实

- 小程序前端源码在 `miniprogram/`。
- 核心页面集中在 `miniprogram/pages/index/`，通过单页状态切换承载启动页、首页、测算、抽牌、结果、日记等页面。
- 云函数在 `cloudfunctions/`。
- 微信项目配置在 `project.config.json`。
- DeepSeek API Key 只能配置在云函数环境变量里，不能写入前端源码或提交到 Git。

## 防幻觉工作规则

1. 不要凭聊天记忆改 UI。每次改页面前必须读取真实 WXML/WXSS/JS。
2. 如果用户说“按截图/UI稿”，先定位当前实现，再明确本次只改哪些页面和视觉点。
3. 每次只做一个清晰小任务，不要顺手重构无关页面。
4. 不要改动 `output/`、`tmp/`、`project.private.config.json`、`.env*`、原型图、市场调研资料或高分辨率素材目录。
5. 不要提交密钥、token、pem/key 文件或微信本地私有配置。
6. 修改后必须运行与改动相关的最小检查；前端主逻辑至少运行：

```bash
node --check miniprogram/pages/index/index.js
python3 -m json.tool project.config.json >/dev/null
```

7. 每次完成后更新 `docs/ITERATION_LOG.md`，写清楚改动页面、文件、验证结果、风险、提交号和可复查的 diff 基线。
8. 每个可交付小任务都要提交 Git commit。不要把多轮 UI 修改长期留在未提交状态。
9. commit 只能保证本地可 diff；如果目的是让后续会话、其他机器或 GitHub 都能看到每轮差异，完成小任务并验证后应 push 到远端。
10. push 规则：默认由 Claude 判断是否需要 push 并明确询问用户；只有用户在当前项目中明确说“以后自动 push”或等价长期授权后，才可在验证通过后自动 push。没有授权时，不要擅自 push。
11. 每次完成后报告当前 `git status --short --branch`。如果显示 `[ahead N]`，必须明确说明远端还看不到这些版本差异，并询问用户是否 push。
12. 如果新开分支或 fork 任务，完成后必须明确合并回 `main`，按上述 push 规则同步到 GitHub，并确认 GitHub 上能看到结果。

## 常用检查

```bash
git status --short --branch
git diff --stat
node --check miniprogram/pages/index/index.js
node --check miniprogram/services/cloudApi.js
node --check cloudfunctions/analysis/index.js
python3 -m json.tool project.config.json >/dev/null
```

如需生成微信预览二维码，先确认微信开发者工具已登录并打开服务端口，再执行：

```bash
/Applications/wechatwebdevtools.app/Contents/MacOS/cli preview \
  --project "/Users/shimiao/Documents/Codex/玄学" \
  --qr-format image \
  --qr-output "/Users/shimiao/Documents/Codex/玄学/output/wechat-preview/preview-qrcode.png"
```

`output/` 已被忽略，预览二维码不要提交。

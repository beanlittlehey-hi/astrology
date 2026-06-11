# 月息塔罗迭代日志

这个文件用于减少长上下文协作中的幻觉。每次 Claude Code、Codex 或其他工具接手后，都要在这里记录真实改动，而不是只依赖聊天记录。

## 记录格式

```md
## YYYY-MM-DD - 任务标题

- 页面/模块：
- 改动文件：
- 改动摘要：
- 验证：
- 风险/待确认：
- 基线/对比：
- 提交：
- 远端状态：
```

## 2026-06-11 - 微信审核版本入库

- 页面/模块：月息塔罗微信小程序全量审核版
- 改动文件：`miniprogram/`、`cloudfunctions/`、`project.config.json`、`.gitignore`
- 改动摘要：提交当前已上传微信审核的小程序源码、云函数和项目配置；忽略本地临时文件、原型资料、私有配置和密钥文件。
- 验证：`node --check miniprogram/pages/index/index.js`、`node --check miniprogram/services/cloudApi.js`、`node --check cloudfunctions/analysis/index.js`、`python3 -m json.tool project.config.json >/dev/null`
- 风险/待确认：微信审核状态、公众平台资质、云函数线上环境变量和 DeepSeek 余额仍需在对应平台确认。
- 提交：`7d9f79d Add WeChat mini program audit version`

## 2026-06-11 - Claude Code 交接规范

- 页面/模块：协作流程与版本管理
- 改动文件：`CLAUDE.md`、`docs/ITERATION_LOG.md`、`.github/pull_request_template.md`、`README.md`
- 改动摘要：新增 Claude Code 接手规则、迭代日志模板和 PR 检查项，要求后续任务以 GitHub `main` 和真实源码为准，小步修改、小步提交。
- 验证：待本次提交前运行语法和配置检查。
- 风险/待确认：这是文档和流程约束，不会自动阻止错误修改；后续执行者仍需严格遵守。
- 提交：`84f1a75 Add Claude Code handoff workflow`

## 2026-06-11 - 首页 home-v2 可编辑 UI 还原

- 页面/模块：首页 `home`
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将首页切换为 `home-v2` 可编辑结构，使用 `miniprogram/assets/home-v2/` PNG 背景、卡片、塔罗卡背、问/记图标和三栏 Tab 图标；保留头像抽屉、今日抽牌、专属牌阵、最近日记和底部导航原有点击绑定。
- 验证：`git status --short --branch`、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、`miniprogram/assets/home-v2/*` 资源存在性检查、微信开发者工具 `cli preview` 均已通过；预览包约 `2.0 MB`。
- 风险/待确认：PNG 资源保持原格式，需通过微信开发者工具预览确认首页视觉与包体大小；本次不改其它页面。
- 基线/对比：`git diff 84f1a75..ab1a278 -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/assets/home-v2 docs/ITERATION_LOG.md`
- 提交：`ab1a278 Restore editable home v2 UI`、`36d40b3 Record home v2 commit in iteration log`
- 远端状态：已在本轮同步到 `origin/main`，GitHub 可通过上述提交号和 diff 基线复查首页差异。

## 2026-06-11 - Codex push 规则固化

- 页面/模块：协作流程与版本管理
- 改动文件：`AGENTS.md`、`docs/ITERATION_LOG.md`
- 改动摘要：新增 Codex 项目协作规则，明确默认中文、命令前说明目的和风险、push 前确认、发现 `[ahead N]` 时必须提示远端不可见并询问是否 push。
- 验证：待本次提交前运行 Git 状态和文档差异检查。
- 风险/待确认：这是流程文档，不影响小程序运行；本地提交后仍需用户确认才 push。
- 基线/对比：`git diff -- AGENTS.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

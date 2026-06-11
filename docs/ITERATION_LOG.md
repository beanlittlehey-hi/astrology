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
- 提交：
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
- 提交：待提交

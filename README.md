# 月息塔罗微信小程序

这是「月息塔罗」微信小程序源码仓库。当前 `main` 分支用于保存已上传微信审核的版本，并作为后续 Claude Code、Codex 或其他工具继续迭代时的唯一可信版本源。

## 快速入口

- 小程序前端：`miniprogram/`
- 云函数：`cloudfunctions/`
- 微信项目配置：`project.config.json`
- Claude Code 接手规则：`CLAUDE.md`
- 迭代日志：`docs/ITERATION_LOG.md`

## 接手前必须做

```bash
git status --short --branch
git log --oneline --decorate -n 5
```

改 UI 前必须读取真实源码，不要只依赖聊天上下文或旧截图描述。核心页面主要在：

- `miniprogram/pages/index/index.wxml`
- `miniprogram/pages/index/index.wxss`
- `miniprogram/pages/index/index.js`

## 本地检查

```bash
node --check miniprogram/pages/index/index.js
node --check miniprogram/services/cloudApi.js
node --check cloudfunctions/analysis/index.js
python3 -m json.tool project.config.json >/dev/null
```

## 注意事项

- 不要提交 `project.private.config.json`、`.env*`、`output/`、`tmp/`、原型资料、市场调研资料或高分辨率素材目录。
- DeepSeek API Key 只能放在云函数环境变量中，不能写进前端源码或提交到 Git。
- 每次迭代请更新 `docs/ITERATION_LOG.md`，写清楚改动页面、文件、验证结果、风险、提交号和 diff 基线。
- 本地 commit 只能让当前机器可追踪差异；如需跨会话或在 GitHub 上恢复每轮版本，验证通过后应 push 到远端。

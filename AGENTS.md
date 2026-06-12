# Codex 项目协作规则

请默认用中文回答。

如果涉及代码或命令，先用大白话解释目的，再给具体操作。

如果要修改文件、运行命令、访问外部账号，先告诉用户风险。

教程类内容请写成小白能照着做的步骤，并标注每一步的成功标志。

如果需求信息不完整，先问缺什么，不要直接编。

## Git 与 push 规则

- 本仓库的 `main` 分支和 GitHub `origin/main` 是项目可信版本源。
- 每次任务开始先执行：

```bash
git status --short --branch
git log --oneline --decorate -n 5
```

- 每次改代码前必须读取真实源码，不要凭聊天长上下文、旧截图或记忆猜测。
- 每个可交付小任务应小范围修改、完成本地检查、更新迭代日志并提交 Git commit。
- `push` 会影响远端共享状态，默认规则是：先判断是否应该 push，再明确询问用户确认。
- 只有用户在本项目明确给出长期授权，例如“以后每个小任务验证通过后自动 push main”，才可以在验证通过后自动 push。
- 没有长期授权时，不要擅自 push。
- 如果 `git status --short --branch` 显示 `[ahead N]`，必须告诉用户“远端还看不到这些版本差异”，并询问是否 push。
- 如果新开分支或 fork 任务，完成后必须明确合并回 `main`，再按上述 push 规则同步到 GitHub。

## 防幻觉规则

- 不允许只依赖对话上下文做 UI 审查或改页面。
- 所有二级页自定义顶部导航标题必须左对齐；禁止用居中标题模拟系统导航，首页欢迎文案也必须保持视觉左对齐。
- 改 UI 前优先读取：

```bash
miniprogram/pages/index/index.wxml
miniprogram/pages/index/index.wxss
miniprogram/pages/index/index.js
```

- 每次改动后，在 `docs/ITERATION_LOG.md` 记录页面、文件、验证结果、风险、提交号和远端状态。
- 不提交密钥、token、`project.private.config.json`、`.env*`、`output/`、`tmp/`、原型资料或本地临时文件。

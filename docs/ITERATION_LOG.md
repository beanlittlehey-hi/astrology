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
- 验证：`git status --short --branch`、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`
- 风险/待确认：这是流程文档，不影响小程序运行。
- 基线/对比：`git diff -- AGENTS.md docs/ITERATION_LOG.md`
- 提交：`79b22eb Add Codex project guardrails`
- 远端状态：已同步到 `origin/main`

## 2026-06-11 - 首页 Tab 图标资源轻量化接入

- 页面/模块：首页底部 Tab
- 改动文件：`miniprogram/assets/home-v2/tab-home-active.png`、`miniprogram/assets/home-v2/tab-home-default.png`、`miniprogram/assets/home-v2/tab-reading-active.png`、`miniprogram/assets/home-v2/tab-reading-default.png`、`miniprogram/assets/home-v2/tab-diary-active.png`、`miniprogram/assets/home-v2/tab-diary-default.png`、`docs/ITERATION_LOG.md`
- 改动摘要：从 `/Users/shimiao/Desktop/Moon-Island-homepage01/` 提取 6 张 Tab 源图主体，去除边缘棋盘格背景，裁切为透明 `128x128` PNG，单张大小控制在约 `21K-31K`。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/home-v2/tab-*.png`、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`
- 风险/待确认：源图本身没有透明通道，当前为自动去除边缘浅色棋盘格后的轻量版本；需真机预览确认细节边缘是否满足视觉要求。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2/tab-*.png docs/ITERATION_LOG.md`
- 提交：本提交 `Optimize home tab icon assets`
- 远端状态：待用户确认是否 push

## 2026-06-12 - 首页现有图片尺寸与透明背景修复

- 页面/模块：首页 `home-v2` 图片资源
- 改动文件：`miniprogram/assets/home-v2/home-bg-clean.jpg`、`miniprogram/assets/home-v2/home-card-hero-bg.png`、`miniprogram/assets/home-v2/home-card-small-bg.png`、`miniprogram/assets/home-v2/home-icon-question.png`、`miniprogram/assets/home-v2/home-icon-diary.png`、`miniprogram/pages/index/index.wxml`、`docs/ITERATION_LOG.md`
- 改动摘要：仅处理 `/Users/shimiao/Desktop/Moon-Island-homepage01/` 已有图片，不重新生成；将首页背景改为长屏 `750x1624` 并压缩为 JPG 以满足微信预览包 2MB 限制，将大小卡片裁切为透明 PNG 并保持现有小程序尺寸，将问/记图标裁切为透明 `128x128`。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/home-v2/home-*.png`、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`
- 风险/待确认：背景源图为 `1024x1536`，为适配 `750x1624` 长屏，底部使用模糊延展补足；背景最终采用 JPG 压缩，需真机预览确认是否接受。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2/home-* miniprogram/pages/index/index.wxml docs/ITERATION_LOG.md`
- 提交：本提交 `Fix home image asset sizing`
- 远端状态：待用户确认是否 push

## 2026-06-12 - 首页资源与 Tab 还原修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/home-bg-clean.png`、`miniprogram/assets/home-v2/home-card-hero-bg.png`、`miniprogram/assets/home-v2/home-card-small-bg.png`、`miniprogram/assets/home-v2/home-icon-question.png`、`miniprogram/assets/home-v2/home-icon-diary.png`、`miniprogram/assets/home-v2/tab-card-bg.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：使用用户新提供的长屏 PNG 背景替换模糊 JPG；从桌面源图重新处理首页大小卡片和问/记图标，只去除边缘棋盘格/白边并保留卡片内部玻璃拟态；接入 `tab-card-bg.png` 作为底部 Tab 玻璃底图，并放大首页卡片、图标和 Tab 资源显示尺寸。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：新背景为高清 PNG，清晰度优先但包体明显大于上一版 JPG；如果微信预览或审核包体受限，需在不引入模糊延展的前提下进一步压缩背景。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`8924864 Fix home resource fidelity and tab bar`
- 远端状态：已同步到 `origin/main`

## 2026-06-12 - 首页二次肉眼还原修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/home-bg-clean.jpg`、`miniprogram/assets/home-v2/tarot-card-back.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将首页背景从 36 色 PNG 改为保色 JPG 压缩，重做塔罗背面透明裁切以去掉棋盘格/白边；小卡从 `button` 改为满宽 `view`，统一两张小卡尺寸；底部 Tab 图标从 WXSS 背景图改为 WXML `<image>` 渲染，修复真机图标不可见；顶部欢迎行强制左对齐。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：背景采用 JPG 是为了在 2MB 预览包限制内保留更接近原图的颜色；需真机肉眼确认卡片铺满、Tab 图标和塔罗背面边缘。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`3e673eb Refine home visual assets and tab icons`
- 远端状态：已同步到 `origin/main`

## 2026-06-12 - 首页第三轮按钮与 Tab 细节修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/home-draw-button-bg.png`、`miniprogram/assets/home-v2/home-card-small-bg.png`、`miniprogram/assets/home-v2/tab-card-bg.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将顶部欢迎行从 `button` 改为 `view` 以保证视觉左对齐；新增抽卡按钮背景图并用 WXML 文本叠加；替换用户新提供的小卡背景和 Tab 背景；Tab 背景改为 WXML `<image>` 层，Tab icon 与字号放大。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：新小卡背景源图本身装饰更弱，当前按新资源真实比例处理；需真机肉眼确认小卡高度、Tab 图标和按钮背景。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`5ddb886 Refine home button cards and tab sizing`
- 远端状态：已同步到 `origin/main`

## 2026-06-12 - 首页第四轮间距与小卡装饰修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/home-card-small-bg.png`、`miniprogram/assets/home-v2/home-card-small-right-bg.png`、`miniprogram/assets/home-v2/tab-card-bg.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：增加今日运势卡片高度并缩小/右移塔罗牌，拉开抽卡按钮和塔罗牌距离；重新处理小卡玻璃底并新增右下角月亮荷花装饰层；问/记内容左对齐；底部 Tab 恢复更低高度并保留放大图标与文字。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：右下角装饰来自烘进棋盘格的源图，当前已去除边缘背景并压缩，需真机肉眼确认装饰细节是否足够完整。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`25fdb2b Refine home hero spacing and card details`
- 远端状态：已同步到 `origin/main`

## 2026-06-12 - 首页第五轮小卡与 Tab 根因修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/tab-card-bg.png`、`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：问/记小卡内容左移，右侧装饰更靠右；首页最近日记只展示前三个情绪标签并隐藏用户输入正文，日期右对齐；Tab 背景改为直角短底图，修复底图被安全区容器拉满导致高度过高的问题。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：`homeEmotionText` 仅用于首页最近日记展示，不改变日记存储和详情页；Tab 背景高度由固定 `92rpx` 控制，需真机确认视觉高度。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2/tab-card-bg.png miniprogram/pages/index/index.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`cce7ccf Fix home journal tags and tab bar height`
- 远端状态：已同步到 `origin/main`

## 2026-06-12 - 首页第六轮日期右对齐与 Tab 容器修复

- 页面/模块：首页 `home-v2`
- 改动文件：`miniprogram/assets/home-v2/tab-card-bg.png`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：修复最近日记日期只在窄 `.list-copy` 内对齐的问题，为最近日记单独扩展右侧内容宽度；将 Tab 直角背景图从 `92` 高调整为 `118` 高，并让底图和 `nav-item` 同高贴底，避免 icon/文字溢出到底图外。
- 验证：待本次提交前运行资源尺寸检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：最近日记宽度用首页尺寸公式控制，目标是让日期贴近小卡右侧；需真机确认是否与右侧装饰重叠到可接受范围。
- 基线/对比：`git diff --stat -- miniprogram/assets/home-v2/tab-card-bg.png miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 首页 Tab 最大高度覆盖恢复

- 页面/模块：首页 `home-v2` 底部 Tab
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：按用户要求直接恢复上一版最大高度覆盖方式，将底部 Tab 容器恢复到 `142rpx + safe-area`，底图改回 `inset: 0` 和 `height: 100%` 铺满整个固定容器，避免底部露出页面模糊背景；Tab 图标和字号保持当前大小不变。
- 验证：待本次提交前运行 `node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：该修改会让 Tab 视觉高度回到更高版本，用于覆盖模糊背景；如果后续还要缩短，需要同步提供更矮且能完全包住 icon/文字的底图资源。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 启动页心绪小岛视觉还原

- 页面/模块：启动页 `splash`
- 改动文件：`miniprogram/assets/splash-v2/`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：按 `splash-reference.png` 将启动页重做为「心绪小岛」视觉；新增整屏插画背景、免责声明玻璃卡片背景和按钮背景，文字仍由前端渲染；保留点击「开启治愈之旅」拉起微信授权面板的原登录流程。
- 资源处理：`splash-bg-clean.png` 转为高质量 JPG 控制包体；`splash-disclaimer-card-bg.png` 和 `splash-start-button-bg.png` 先去除烘进图里的棋盘格/白边，最终保留为小尺寸真透明 PNG。曾尝试 WebP 以控包体，但真机预览中底图肉眼不可见，因此改回 PNG 兼容方案；后续复查发现 PNG 有 alpha 但没有真实透明像素，已重做四周透明和裁边，并放大免责声明卡片高度。
- 包体处理：删除无引用旧启动页品牌 logo，给微信 2MB 预览包保留余量。
- 验证：待本次提交前运行资源尺寸/alpha 检查、`node --check miniprogram/pages/index/index.js`、`python3 -m json.tool project.config.json >/dev/null`、微信开发者工具 `cli preview`。
- 风险/待确认：启动页品牌文案按用户确认改为「心绪小岛」，首页等其它页面暂不改品牌名；需真机肉眼确认背景压缩质量、标题位置和底部卡片比例。
- 基线/对比：`git diff --stat -- miniprogram/assets/splash-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 牌阵选择页视觉资源接入

- 页面/模块：测算 / 牌阵选择页 `question`
- 改动文件：`miniprogram/assets/reading-v2/reading-bg-clean.jpg`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：按 `readingpage- reference.png` 接入牌阵页整屏背景，并将标题、分类、牌阵名称、描述、推荐标签全部保留为前端渲染；底部 Tab 继续复用首页视觉，不采用参考图里的底部 tab。为避免包体超过微信 2MB 限制，分类胶囊、返回按钮、标签和牌阵缩略图改用 WXSS 玻璃拟态与轻量卡牌符号重建，未把 GPT Image 2 的透明组件 PNG 放入主包。
- 资源处理：原始 GPT Image 2 生成图保留在 `output/imagegen/reading-v2/` 供复查；小程序主包只保留压缩后的 `reading-bg-clean.jpg`，尺寸为 `548x960`，约 `20KB`，避免再次触发 `source size exceed max limit 2MB`。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；微信开发者工具 `cli preview` 成功，二维码输出到 `output/wechat-preview/preview-qrcode.png`，上传包体显示 `2094743` Byte。
- 风险/待确认：牌阵页卡片缩略图为 CSS 重建，不是参考图单独切图；这是为了在不影响首页和启动页已确认视觉的前提下通过微信 2MB 主包限制。后续若要更高还原度，建议做分包或迁移部分塔罗牌图到云端/CDN。
- 基线/对比：`git diff --stat -- miniprogram/assets/reading-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 主包体积架构优化

- 页面/模块：主包架构、塔罗牌资源、已关闭疗愈商城
- 改动文件：`miniprogram/app.json`、`miniprogram/packages/tarot-assets/`、`miniprogram/assets/tarot/`、`miniprogram/data/content.js`、`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`
- 改动摘要：不压缩首页/启动页/塔罗牌视觉资源，改用代码层优化释放主包空间。删除当前不可达的 `healing/custom` 疗愈商城 WXML、JS、WXSS 和水晶首饰数据；将 78 张塔罗正面牌图从主包 `assets/tarot` 迁移到 `packages/tarot-assets` 分包，主包只保留抽牌牌背 `card-back.jpg`；`content.js` 中牌面图片路径同步改为分包路径，并在 `app.json` 增加分包与预下载规则。
- 包体结果：优化前最近预览总包约 `2094743` Byte 且无分包；剥离疗愈商城后约 `2068307` Byte；迁移塔罗正面牌图后预览成功，主包约 `1037181` Byte，塔罗资源分包约 `1033100` Byte，总包约 `2070281` Byte。主包释放约 `1MB`，为后续高还原页面预留空间。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；图片引用完整性检查无缺失；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`。
- 风险/待确认：主包页面会引用分包内塔罗正面图，微信预览已接受；已配置 `preloadRule` 在主页面预下载 `packages/tarot-assets`，但真机首次进入抽牌结果时仍需肉眼确认牌图是否有短暂加载空白。若后续要进一步提升稳定性，可把抽牌/结果页也拆入业务分包。
- 基线/对比：`git diff --stat -- miniprogram/app.json miniprogram/packages/tarot-assets miniprogram/assets/tarot miniprogram/data/content.js miniprogram/pages/index`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 今日单张牌导航对齐与上移修复

- 页面/模块：今日单张牌、二级页面顶部导航
- 改动文件：`miniprogram/utils/navLayout.js`、`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：新增可复用 `getNavLayout()` 工具，使用 `wx.getMenuButtonBoundingClientRect()` 与 `wx.getWindowInfo()` 计算微信胶囊真实坐标、标题区、返回按钮尺寸和导航总高度；今日单张牌、测算/牌阵、抽牌、结果、日记列表和日记详情统一改用 fixed `.custom-nav`，返回按钮和标题直接使用 px 坐标与右上角胶囊垂直居中；删除今日单张牌副标题「给今天一个温和提醒」，并让今日卡牌卡片、今日行动卡片和按钮贴近导航标题下方。
- 根因：此前页面导航仍在内容流里靠 `rpx` padding 和负 margin 回拉，即使读取了胶囊高度，也会被页面 padding、历史 `.topbar` 样式和标题副标题高度影响；正确做法是公共工具计算真实 px 坐标，导航层 fixed 到屏幕顶部，内容区只按 `navTotalHeight` 避让。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2076062` Byte，主包约 `1042962` Byte。
- 风险/待确认：标题区会同时预留左侧返回按钮安全区和右侧胶囊安全区，较长标题会省略显示；需真机/模拟器确认刘海屏和普通安卓尺寸下，今日单张牌、测算、抽牌、结果、日记列表、日记详情标题/返回按钮均与右上角胶囊同线。首页欢迎区和启动页不纳入二级导航规则，底部 tab 未改。
- 基线/对比：`git diff --stat -- miniprogram/utils/navLayout.js miniprogram/pages/index/index.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 自定义导航标题可见性与结果页返回修复

- 页面/模块：今日单张牌、抽牌页、结果页、日记列表、日记详情、自定义导航
- 改动文件：`miniprogram/utils/navLayout.js`、`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：导航标题统一改为中性 `custom-nav-title-text`，不再复用 `daily-title`、`draw-title`、`journal-topbar` 等历史页面类名；返回按钮改用 `navLayout.leftButtonLeft` 的 px 坐标；塔罗结果页补回左侧返回按钮，并根据来源从抽牌结果返回抽牌页、从日记报告返回日记详情；结果页右侧「享」按钮按用户要求继续删除。
- 根因：上一轮 fixed 导航仍把标题节点挂在旧业务类名上，历史 WXSS 会继续干扰标题显示；结果页左侧返回按钮是 WXML 结构缺失，不是样式隐藏。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2076636` Byte，主包约 `1043536` Byte。
- 风险/待确认：结果页返回目标依赖 `resultBackScreen/resultBackNav`，需真机确认从抽牌进入和从日记详情进入两条路径都返回正确；标题改为统一中性样式后，需肉眼确认各页标题字号颜色符合当前视觉。
- 基线/对比：`git diff --stat -- miniprogram/utils/navLayout.js miniprogram/pages/index/index.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 自定义导航标题统一左对齐规则

- 页面/模块：二级页面自定义顶部导航、项目 UI 规则
- 改动文件：`miniprogram/pages/index/index.wxss`、`AGENTS.md`、`docs/ITERATION_LOG.md`
- 改动摘要：在现有 `navLayout + custom-nav` 公共导航基础上，将 `.custom-nav-title` 与 `.custom-nav-title-text` 显式改为左对齐；保留返回按钮、标题区和微信右上角胶囊的 px 测量规则不变，避免标题继续居中显示或被历史样式覆盖。项目规则同步新增：所有二级页自定义顶部导航标题必须左对齐，首页欢迎文案也必须保持视觉左对齐。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过。
- 风险/待确认：本轮只改变所有 `custom-nav-title` 标题的文本对齐方式，不改导航测量和业务逻辑；需肉眼确认今日单张牌、测算/牌阵、抽牌、结果页、日记列表、日记详情标题均左对齐且不压到右侧胶囊。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss AGENTS.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 自定义导航标题真实左边距修复

- 页面/模块：今日单张牌、测算/牌阵、抽牌、结果页、日记列表、日记详情、自定义导航
- 改动文件：`miniprogram/utils/navLayout.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`AGENTS.md`、`docs/ITERATION_LOG.md`
- 根因：上一轮只把标题文本 `text-align` 改成左对齐，但 `navLayout.titleLeft` 仍用 `Math.max(右侧胶囊安全宽度, 左侧返回按钮宽度)` 计算；在部分机型上右侧胶囊安全宽度更大，导致标题容器起点被整体推到右侧，看起来仍然没有真正左对齐。
- 改动摘要：将自定义导航拆出 `custom-nav-left-title` / `custom-nav-center-title` 模式；左标题模式以内容主边距 `32rpx` 为基准，返回按钮固定从 `32rpx` 开始，有返回按钮的标题从 `32rpx + 返回按钮宽度 + 16rpx` 开始，无返回按钮的标题从 `32rpx` 开始；右侧胶囊只影响 `titleRight` 避让距离，不再参与标题左起点计算。返回按钮和标题改为相对 `.custom-nav` 的 absolute 定位，避免子元素继续脱离导航容器。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过。
- 风险/待确认：标题会比上一版明显向左移动；长标题仍会在右侧胶囊避让前省略，需真机肉眼确认各二级页标题不压到胶囊。
- 基线/对比：`git diff --stat -- miniprogram/utils/navLayout.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss AGENTS.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 导航栏与标题栏位置冻结规则

- 页面/模块：项目 UI 协作规则、自定义导航
- 改动文件：`AGENTS.md`、`docs/ITERATION_LOG.md`
- 改动摘要：按用户确认，将本轮导航与标题栏实现固化为后续默认规则：所有后续页面和视觉改动不得调整自定义导航栏高度、返回按钮位置、标题起点、标题垂直对齐和右侧胶囊避让规则；除非用户明确指出要修改导航或标题位置。
- 验证：文档规则更新，无业务代码改动。
- 风险/待确认：后续 UI 迭代必须避开导航/标题位置，页面主体内容需要以现有 `navLayout` 和 `custom-nav` 为固定边界继续设计。
- 基线/对比：`git diff --stat -- AGENTS.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待 push

## 2026-06-12 - 非启动页统一复用首页背景

- 页面/模块：今日单张牌、测算/牌阵、抽牌、结果页、日记列表、日记详情、页面背景资源
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`miniprogram/assets/reading-v2/reading-bg-clean.jpg`、`docs/ITERATION_LOG.md`
- 改动摘要：除启动页/登录授权区域外，所有内容页统一复用首页背景 `/assets/home-v2/home-bg-clean.jpg`；首页本身保持原背景引用不变。新增公共 `shared-page-bg` 背景层，测算页旧 `reading-bg-clean.jpg` 不再引用并删除，避免复制首页背景导致包体增加。
- 包体策略：复用已有首页背景文件，不新增背景图片；删除约 `20KB` 的旧测算页背景资源，控制主包体积。
- 验证：`rg -n "reading-bg-clean|shared-page-bg|home-bg-clean|splash-bg-clean" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/pages/index/index.js miniprogram/app.json` 确认旧测算背景无引用；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2057810` Byte，主包约 `1024710` Byte。
- 风险/待确认：测算页原独立背景被替换为首页背景，页面卡片和内容层保持原样；导航栏/标题栏冻结规则未改动。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/assets/reading-v2 docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

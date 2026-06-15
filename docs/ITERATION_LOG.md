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
- 提交：`df6e2ab`
- 远端状态：本地 `main` ahead 1，远端暂时看不到该版本，待用户确认是否 push

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

## 2026-06-12 - 固定首页背景并清除旧染色层

- 页面/模块：今日单张牌、测算/牌阵、抽牌、结果页、日记列表、日记详情、页面背景渲染
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：上一轮复用首页背景时只替换了图片路径，但背景 `<image>` 仍作为页面内布局层使用 `height: 100% + aspectFill`，长内容页会按内容高度缩放造成拉伸；同时历史 `.screen::before`、`.app-screen::after` 和内容区渐变背景仍叠在图片上，导致颜色看起来和首页不一致。
- 改动摘要：给所有非启动/登录内容页增加 `has-shared-bg` 标记；将 `shared-page-bg` 改成固定视口 `position: fixed; width: 100vw; height: 100vh`，背景不再随页面滚动或长内容拉伸；关闭 `has-shared-bg` 下的旧伪元素染色层，并把内容容器背景强制透明。导航栏/标题栏冻结规则未改动。
- 验证：`rg -n "shared-page-bg|has-shared-bg|reading-bg-clean|home-bg-clean|splash-bg-clean" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/pages/index/index.js miniprogram/app.json` 确认非启动页使用固定首页背景且旧测算背景无引用；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2058617` Byte，主包约 `1025517` Byte。
- 风险/待确认：背景图固定后，长页面滚动时组件会在同一张静态背景上移动；需真机确认各内容页背景颜色与首页一致，启动页/登录页不受影响。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-12 - 修复共享背景导致导航占位重复

- 页面/模块：自定义导航冻结规则、共享背景层
- 改动文件：`miniprogram/pages/index/index.wxss`、`AGENTS.md`、`docs/ITERATION_LOG.md`
- 根因：上一轮为了把内容层提升到固定背景上方，使用了 `.app-screen.has-shared-bg > .content, .app-screen.has-shared-bg > .custom-nav, ... { position: relative; z-index: 3; }`，这条规则覆盖了冻结导航的 `.custom-nav { position: fixed; }`。导航重新进入文档流后，内容区仍保留 `padding-top: navLayout.navTotalHeight`，导致顶部导航高度被计算两次，卡片和标题栏之间出现过大留白。
- 改动摘要：从共享背景层级规则中移除 `.custom-nav`，单独声明 `.app-screen.has-shared-bg > .custom-nav { position: fixed; z-index: 900; }`，确保导航继续固定在顶部且不参与文档流；项目规则补充禁止后续覆盖 `.custom-nav` 的固定定位。
- 验证：`rg -n "has-shared-bg > \\.custom-nav|has-shared-bg > \\.content|custom-nav \\{|position: fixed|position: relative|navLayout.navTotalHeight" miniprogram/pages/index/index.wxss miniprogram/pages/index/index.wxml AGENTS.md` 确认 `.custom-nav` 在共享背景页仍保持 `position: fixed`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2058644` Byte，主包约 `1025544` Byte。
- 风险/待确认：只恢复导航 fixed 定位，不改 `navLayout`、标题坐标、内容卡片样式和底部 tab。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss AGENTS.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-13 - 牌阵页分类与牌阵删减

- 页面/模块：测算 / 专属牌阵页
- 改动文件：`miniprogram/data/content.js`、`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`docs/ITERATION_LOG.md`
- 改动摘要：将页面标题从「进一步探索真实的内心」改为「专属牌阵」；分类删除「财富」，保留「感情 / 工作 / 其他」；牌阵列表删除「关系走向牌阵」「阻碍与建议牌阵」和原本未要求保留的「单张指引」，只展示「三张牌阵」「爱情十字牌阵」「二选一抉择牌阵」「事业财富牌阵」。点击「工作」时自动选中并高亮「事业财富牌阵」，感情默认高亮「爱情十字牌阵」，其他默认高亮「三张牌阵」。
- 验证：`rg -n "进一步探索真实的内心|财富\\\"|name: \\\"财富\\\"|id: \\\"wealth\\\"|关系走向牌阵|阻碍与建议牌阵|id: \\\"relation\\\"|id: \\\"block\\\"|id: \\\"single\\\"|questionOrder|recommended|专属牌阵|事业财富牌阵" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.js miniprogram/data/content.js` 确认分类和牌阵删减结果；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2058043` Byte，主包约 `1024943` Byte。
- 风险/待确认：历史日记或旧会话中如果曾保存被删除牌阵的名称，结果详情仍展示旧记录文本；本轮只调整牌阵选择页和新抽牌流程，不迁移历史数据。
- 基线/对比：`git diff --stat -- miniprogram/data/content.js miniprogram/pages/index/index.js miniprogram/pages/index/index.wxml docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 专属牌阵页切图资源接入

- 页面/模块：测算 / 专属牌阵页组件视觉
- 改动文件：`miniprogram/assets/reading-v2/*`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：按已确认的 `reading-v3` 切图方案接入分类 tab 默认/选中背景、牌阵卡片默认/高亮背景、右侧按钮默认/推荐背景，以及三张牌阵、爱情十字、二选一抉择、事业财富四个左侧缩略插画。文字、推荐状态、分类状态、牌阵点击逻辑仍由 WXML/JS 动态渲染。
- 冻结范围：未修改顶部返回按钮、标题栏、`navLayout`、底部 tab、整体页面固定首页背景和业务流程。
- 包体策略：未生成整屏背景，不复制首页背景；新增 `reading-v2` 透明 PNG 资源总量约 `176KB`，全部通过 `hasAlpha: yes` 检查。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/reading-v2/*.png` 确认 10 个组件尺寸正确且均有 alpha；`du -ch miniprogram/assets/reading-v2/*.png | tail -1` 显示总量约 `176K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode.png`，总包约 `2215072` Byte，主包约 `1181972` Byte。
- 风险/待确认：轻量版 PNG 使用调色板压缩控制包体，大卡玻璃纹理较原始生成图略有简化；需真机肉眼确认专属牌阵页卡片、分类 tab、右侧按钮和缩略图与参考图接近。
- 基线/对比：`git diff --stat -- miniprogram/assets/reading-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：`9e037b9`（资源接入提交）
- 远端状态：本地 `main` ahead 1，远端暂时看不到该版本，待用户确认是否 push

## 2026-06-14 - 专属牌阵右侧按钮默认态高度修复

- 页面/模块：测算 / 专属牌阵页卡片右侧按钮
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将牌阵卡片右侧按钮默认态容器从约 `104rpx x 64rpx` 调整为 `118rpx x 72rpx`，与 active/推荐态高度一致，避免默认态背景图被压得过窄、缺少呼吸感；active 态尺寸保持一致。
- 冻结范围：未修改顶部返回按钮、标题栏、`navLayout`、底部 tab、整体页面固定背景和业务逻辑。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过。微信开发者工具 `cli preview` 连续两次在 preparing 阶段返回 `TypeError: Failed to fetch (code 10)`，未生成新二维码，需待工具网络恢复后重试。
- 风险/待确认：默认态按钮宽高变大后，需真机确认右侧按钮文字和牌阵描述之间仍有足够间距。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 专属牌阵卡片右侧按钮删除

- 页面/模块：测算 / 专属牌阵页牌阵卡片
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`miniprogram/assets/reading-v2/*`、`docs/ITERATION_LOG.md`
- 改动摘要：删除每张牌阵卡片右侧按钮节点，不再展示「推荐/通用/工作」等右侧按钮；将牌阵卡片布局从三列改为缩略图 + 文案两列，说明小字占满原按钮所在的横向空间，避免右侧留白。
- 包体策略：删除不再引用的 `reading-card-action-active-bg.png` 和 `reading-card-action-default-bg.png`，`reading-v2` 资源目录从约 `176KB` 降至约 `164KB`。
- 冻结范围：未修改顶部返回按钮、标题栏、`navLayout`、底部 tab、整体页面固定背景和业务逻辑。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/reading-v2/*.png` 确认剩余 8 个组件尺寸正确且均有 alpha；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2204051` Byte，主包约 `1170951` Byte。
- 风险/待确认：右侧推荐信息已完全取消，当前选中态只通过高亮卡片背景体现；需真机肉眼确认小字说明没有撞到右侧卡片边缘。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/assets/reading-v2 docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 单张卡牌页主体切图接入

- 页面/模块：单张卡牌 / daily screen 主体视觉
- 改动文件：`miniprogram/assets/single-card-v2/*`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：接入已确认的 `single-card-v2` 主卡玻璃背景、塔罗牌框、今日小行动卡片背景、主按钮背景、次按钮背景；不使用 `single-copy-panel-bg.png`，关键词和解读继续直接承载在主卡背景现有区域。顶部标题文案从「今日单张牌」改为「单张卡牌」。动态塔罗牌、关键词、解读、输入框和按钮文案仍由 WXML 渲染。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景、登录/抽牌/日记业务逻辑。
- 包体策略：不生成整屏背景，不复制首页背景，不改 tab 资源；新增 `single-card-v2` 透明 PNG 资源总量约 `292KB`，全部通过 `hasAlpha: yes` 检查。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/single-card-v2/*.png` 确认 5 个组件尺寸正确且均有 alpha；`du -ch miniprogram/assets/single-card-v2/*.png | tail -1` 显示总量约 `292K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2494632` Byte，主包约 `1461532` Byte。
- 风险/待确认：主卡背景和塔罗框来自透明化后处理，需真机肉眼确认主卡右上枝叶边缘、塔罗框透明中空区域和按钮文字层级是否符合预期。
- 基线/对比：`git diff --stat -- miniprogram/assets/single-card-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 单张卡牌页下半区紧凑与按钮高度修复

- 页面/模块：单张卡牌 / daily screen 下半区布局
- 改动文件：`miniprogram/assets/single-card-v2/single-primary-button-bg.png`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将「今日小行动」标题改为行动卡片内水平居中；收紧主卡片、行动卡片、主按钮、次按钮之间的垂直间距；行动卡片高度从约 `190rpx` 压到 `160rpx`，输入框高度压到 `74rpx`；主按钮和次按钮统一为 `88rpx` 高，按钮组 gap 收到 `8rpx`，让下半区更容易在首屏内完整露出。
- 资源处理：本地重排 `single-primary-button-bg.png`，从原 `690x96` 调整为 `690x88` 且保留 `hasAlpha: yes`，让「生成今日情绪日记」按钮背景不再被容器压成细条，并与「进一步询问」按钮视觉高度一致。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景、登录/抽牌/日记业务逻辑；不使用 `single-copy-panel-bg.png` 的规则保持不变。
- 包体策略：`single-card-v2` 资源总量仍约 `292KB`，未新增资源，主按钮重排后单文件约 `12KB`。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/single-card-v2/*.png` 确认 5 个组件尺寸正确且均有 alpha，其中 `single-primary-button-bg.png` 为 `690x88`；`du -ch miniprogram/assets/single-card-v2/*.png | tail -1` 显示总量约 `292K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2494664` Byte，主包约 `1461564` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：行动卡片仍使用原 `690x190` 背景图按更矮容器展示，需真机肉眼确认玻璃装饰裁切后仍自然；如果仍觉得下半区偏高，下一步只能进一步压缩主卡内部内容或塔罗牌视觉高度。
- 基线/对比：`git diff --stat -- miniprogram/assets/single-card-v2/single-primary-button-bg.png miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：本地 `main` 已包含未 push 的单张卡牌主体视觉提交，本轮提交后远端仍看不到这些版本差异，待用户确认是否 push

## 2026-06-14 - 单张卡牌主按钮背景重生成

- 页面/模块：单张卡牌 / daily screen 主按钮资源
- 改动文件：`miniprogram/assets/single-card-v2/single-primary-button-bg.png`、`docs/ITERATION_LOG.md`
- 根因：上一版 `single-primary-button-bg.png` 的 PNG 本体就是一条很薄的蓝紫横线，说明压扁发生在 `gpt-image-2` 切图/抠图环节，不是 WXML/WXSS 容器二次压缩导致。
- 改动摘要：使用 `gpt-image-2` 基于 `/Users/shimiao/Desktop/Moon-Island/single-card.png` 单独重生成主按钮背景，并强调“完整蓝紫圆角胶囊按钮、填满 88px 高度、不是细线、不要只提取描边”；生成图返回大尺寸且无 alpha，随后本地透明化棋盘格背景、裁切按钮主体并重排为 `690x88` 透明 PNG。替换后主按钮背景变为完整蓝紫玻璃胶囊。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景、按钮布局高度和业务逻辑。
- 包体策略：`single-primary-button-bg.png` 从约 `12KB` 增至约 `92KB`，`single-card-v2` 资源总量约 `372KB`；为保证按钮视觉完整，本轮接受该资源增量。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/single-card-v2/single-primary-button-bg.png` 确认尺寸 `690x88` 且 `hasAlpha: yes`；`du -ch miniprogram/assets/single-card-v2/*.png | tail -1` 显示总量约 `372K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2576882` Byte，主包约 `1543782` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：按钮主体来自生成图后处理，需真机肉眼确认蓝紫胶囊厚度、金色描边和文字层级是否符合参考图。
- 基线/对比：`git diff --stat -- miniprogram/assets/single-card-v2/single-primary-button-bg.png docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 单张卡牌下半区二次紧凑

- 页面/模块：单张卡牌 / daily screen 下半区布局
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：继续压缩两个按钮之间的距离，将按钮组 gap 从 `8rpx` 收到 `2rpx`，并覆盖全局 button 的 `margin-top: 24rpx` 为 `0`，避免按钮自身上边距继续撑开距离；将今日小行动卡片高度从 `160rpx` 调高到 `176rpx`，输入框高度从 `74rpx` 调高到 `88rpx`，同时收紧行动卡上下 padding 和主卡/行动卡/按钮之间的外边距，保证输入框仍在卡片背景图范围内。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景、按钮资源和业务逻辑。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过。首次微信开发者工具 `cli preview` 连续两次在 Uploading 阶段返回 `上传失败：网络请求错误 Failed to fetch (code 10)`；随后重试成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2576901` Byte，主包约 `1543801` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：一屏展示需要真机肉眼确认；本轮通过收紧下半区间距和按钮 margin 控制总高度，但不同机型可视高度仍可能有差异。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 单张卡牌下半区间距回填

- 页面/模块：单张卡牌 / daily screen 下半区布局
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：上一轮将按钮和卡片间距压得过紧，导致底部仍有空白但组件之间缺少呼吸感。本轮保持今日小行动卡片高度、输入框高度、按钮高度不变，只把下半区空白重新分配到组件之间：主卡片到行动卡片距离从 `4rpx` 调到 `14rpx`，行动卡片到按钮组距离从 `4rpx` 调到 `12rpx`，两个按钮之间 gap 从 `2rpx` 调到 `16rpx`，让页面更接近刚好铺满一屏。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景、按钮资源和业务逻辑。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过。首次微信开发者工具 `cli preview` 连续两次在 preparing 阶段返回 `TypeError: Failed to fetch (code 10)`；随后重试成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2576904` Byte，主包约 `1543804` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：不同机型可视高度仍有差异，需在真机上确认“刚好铺满一屏”的最终观感；本轮只调整空白分配，不改变组件本体尺寸。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 情绪日记页卡片背景与日期栏规则

- 页面/模块：情绪日记 / journal screen
- 改动文件：`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：本周情绪波动卡片增加图片背景层，复用首页今日运势大卡 `home-card-hero-bg.png`；每条情绪日记卡片增加图片背景层，复用首页专属牌阵/小卡 `home-card-small-bg.png`；日记摘要限制最多三行展示，超出部分使用省略号。
- 功能规则：顶部日期栏不再根据日记记录生成日期，避免同一天多条日记时重复展示；改为固定展示「全部 + 本周周一到周日」的日历日期，每一天只出现一次，点击某天后仍按 `journalDateKey` 过滤对应日记。
- 包体策略：未新增图片资源，只复用 `home-v2` 已有图片；本轮包体变化主要来自 WXML/WXSS/JS 代码。
- 冻结范围：未修改顶部导航位置、`navLayout`、底部 tab、整体页面固定首页背景和日记详情业务逻辑。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2577211` Byte，主包约 `1544111` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：本周日期栏按周一到周日展示，若用户希望按“今天往前/往后连续 7 天”而不是自然周，需要再调整日期起点；日记卡片三行省略依赖微信 WebView 对 `-webkit-line-clamp` 的支持。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 牌阵抽牌页主体皮肤接入

- 页面/模块：牌阵抽牌 / draw screen 主体视觉
- 改动文件：`miniprogram/assets/draw-v2/*`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：基于 `/Users/shimiao/Desktop/Moon-Island/问问题.png` 生成并审计 `draw-v2` 组件资源，接入主抽牌玻璃面板、抽牌槽位卡片背景、底部问题输入框背景、发送按钮底图和提示装饰线。文字、用户问题、发送箭头、牌位、状态、牌堆、牌轮、卡背和抽到的牌面仍由 WXML/JS 动态渲染。
- 资源处理：`gpt-image-2` 原始输出全部为大尺寸 RGB 且无 alpha，经本地透明化、裁切、重排为目标尺寸并调色板轻量化；最终 `draw-v2` 5 个透明 PNG 均为 `hasAlpha: yes`，总量约 `196KB`。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背/抽牌逻辑和结果页。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/draw-v2/*.png` 确认尺寸与 alpha 正确；`du -ch miniprogram/assets/draw-v2/*.png | tail -1` 显示总量约 `196K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 重试成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2772057` Byte，主包约 `1738957` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：槽位卡资源较淡，前端已压深文字颜色但仍需真机确认；主面板背景为调色板轻量化版本，玻璃纹理较原始生成图略简化。
- 基线/对比：`git diff --stat -- miniprogram/assets/draw-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 牌阵抽牌页皮肤细节修复

- 页面/模块：牌阵抽牌 / draw screen 主体视觉与输入行为
- 改动文件：`miniprogram/pages/index/index.js`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：进入抽牌页时 `startDraw()` 把 `drawQuestionDraft` 设为上一层 `question`，导致输入框默认带问题；洗牌提示仍在普通文档流中跟随牌堆，未绑定到底部荷花装饰；槽位背景图已生成且 alpha 合格，但旧 `.card-back` 背景/边框仍抢视觉，导致背景没有完整包住卡背和文字。
- 改动摘要：进入抽牌页时清空 `question` 与 `drawQuestionDraft`，仅显示 placeholder；将 `deck-status` 绝对定位到主面板底部荷花装饰上方；固定抽牌槽位高度并让背景图包住卡背、标题和状态，清理槽位内旧卡背容器背景/边框；输入框和内部 input 背景改为透明，文字直接叠在 `draw-input-pill-bg.png` 上。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片、牌轮、抽牌流程和结果页。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/draw-v2/*.png` 确认尺寸与 alpha 正确；`du -ch miniprogram/assets/draw-v2/*.png | tail -1` 显示总量约 `196K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 第二次重试成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2772503` Byte，主包约 `1739403` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：输入框清空后，若用户从旧问题入口进入也需要重新输入问题；这是按本轮“输入框不需要默认一个问题”的规则处理。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.js miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-15 - 小程序命名统一为月栖卡牌日记

- 页面/模块：启动页授权弹窗、登录流程、全局应用名、开发文档
- 改动文件：`miniprogram/app.js`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.js`、`miniprogram/README.md`、`docs/ITERATION_LOG.md`
- 改动摘要：将代码内小程序名称统一为「月栖卡牌日记」；`globalData.appName` 从「塔罗疗愈之旅」改为「月栖卡牌日记」；微信授权弹窗提示从「授权后即可进入心绪小岛。」改为「授权后即可进入月栖卡牌日记。」；登录成功 toast 从「已进入月息塔罗」改为「已进入月栖卡牌日记」；同步更新 `miniprogram/README.md` 中旧项目名。
- Logo/系统页说明：用户截图中的黑底微信启动/授权过渡页显示的小程序名称和头像通常来自微信公众平台的小程序资料，不是小程序包内 WXML/CSS 可直接控制；本轮没有把 `output/imagegen/yuexi-logo/xinxu-island-logo-option-02-optimized.png` 拷入主包，避免新增约 `1.1MB` 无效包体。若要让截图中的系统页头像和名称变更，需要在微信公众平台资料中将名称设为「月栖卡牌日记」，头像上传为 `xinxu-island-logo-option-02-optimized.png`。
- 验证：`rg -n "心绪小岛|月息塔罗|塔罗疗愈之旅|月息日记|已进入月息|授权后即可进入心绪" miniprogram cloudfunctions project.config.json project.private.config.json` 无运行时代码残留；`node --check miniprogram/app.js` 通过；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2937549` Byte，主包约 `1904449` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：微信系统黑底页的头像/名称需公众平台后台资料同步后才会变化，且可能有微信客户端缓存延迟；源码内无法强制替换该系统页 logo。
- 基线/对比：`git diff --stat -- miniprogram/app.js miniprogram/pages/index/index.wxml miniprogram/pages/index/index.js miniprogram/README.md docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-15 - 启动页标题与字体调整

- 页面/模块：启动页 `splash` screen
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：标题文案由「心绪小岛」改为「月栖卡牌日记」；删除标题下方横线和中心小 icon 节点；标题字体切到宋体类字体栈并使用 Heavy 视觉字重；主说明文案、免责声明文案和「开启治愈之旅」按钮文案切到宋体类字体栈；删除横线后将主说明文案用较小 `22rpx` 顶部间距承接标题，避免原横线区域留下过大空白。
- 字体说明：小程序运行环境不保证内置精确的“思源宋体 Heavy/SemiBold”字体文件，本轮使用 `"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", serif` 字体栈，并通过 `font-weight: 900/700/600` 对应 Heavy、Bold/SemiBold 和正文宋体视觉。
- 冻结范围：未修改首页、二级页导航规则、底部 tab、登录弹窗业务逻辑和启动页背景/按钮图片资源。
- 验证：`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2937537` Byte，主包约 `1904437` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：真机如未命中思源宋体会回退到系统宋体，需以真机截图确认字体效果；标题新文案更长，已降低字号和字距避免溢出。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 日记详情页报告按钮高度修复

- 页面/模块：情绪日记 / 日记详情 `diary` screen
- 改动文件：`miniprogram/assets/diary-detail-v2/diary-report-button-bg.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：用户要求保留日记详情页自己的按钮背景图，只把按钮背景图高度调到和 homepage 抽取卡牌按钮一致。上一版误将 WXML 图片路径替换为 homepage 按钮图；另外 `diary-report-button-bg.png` 虽为 `430x96`，但可见 alpha 高度只到约 `y=90`，底部透明留白让按钮看起来仍偏窄。
- 改动摘要：将“查看完整塔罗报告”按钮背景路径改回 `/assets/diary-detail-v2/diary-report-button-bg.png`；本地重排该 PNG，裁掉上下透明留白后重新铺满 `430x96` 透明画布，让原按钮背景自身高度接近 homepage 按钮的 `96px` 视觉高度；根据真机截图将按钮文案下移 `4rpx`，使文字视觉垂直居中。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定背景、日记详情卡片和打开完整塔罗报告的业务逻辑。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/diary-detail-v2/diary-report-button-bg.png` 确认仍为 `430x96` 且 `hasAlpha: yes`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2937752` Byte，主包约 `1904652` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：按钮背景仍是日记详情页原风格，只做纵向铺满处理；需真机确认高度是否符合预期。
- 基线/对比：`git diff --stat -- miniprogram/assets/diary-detail-v2/diary-report-button-bg.png miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 日记详情页卡片文字与报告按钮修复

- 页面/模块：情绪日记 / 日记详情 `diary` screen
- 改动文件：`miniprogram/assets/diary-detail-v2/diary-report-button-bg.png`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：四个卡片左侧 icon 是 WXML 里单独插入的 `<image class="diary-detail-card-icon">`，同时 `.diary-detail-card` 为 icon 保留了 `128rpx` 左 padding，导致文字看起来没有完全左对齐。底部按钮问题不是全局 `.ghost` 首因，而是 `diary-report-button-bg.png` 自身可见 alpha 范围只有约 `x=99..329`，430px 画布左右各有接近 100px 透明留白，所以真机看起来背景没有包住文案。
- 改动摘要：移除四个详情卡片左侧 icon 节点；将卡片 padding 改为左右统一 `42rpx`，标题和正文显式左对齐；本地重排 `diary-report-button-bg.png`，裁掉横向透明留白后重新铺满 `430x96` 透明画布，并为按钮文字补充固定行高和不换行规则。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定背景、标签切图、日记数据和打开完整塔罗报告的业务逻辑。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/diary-detail-v2/*.png` 确认资源尺寸与 alpha；`du -ch miniprogram/assets/diary-detail-v2/*.png | tail -1` 显示资源总量约 `112K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2931110` Byte，主包约 `1898010` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：按钮背景是本地横向重排后的版本，视觉比原图更宽，需要真机确认与参考图的按钮宽度是否符合预期。
- 基线/对比：`git diff --stat -- miniprogram/assets/diary-detail-v2/diary-report-button-bg.png miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 日记详情页切图接入

- 页面/模块：情绪日记 / 日记详情 `diary` screen
- 改动文件：`miniprogram/assets/diary-detail-v2/*`、`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 切图范围：按参考图 `/Users/shimiao/Desktop/Moon-Island/日记详情.png` 只接入顶部标签背景、四个卡片左侧 icon 和“查看完整塔罗报告”按钮背景；顶部标题栏、底部 tab 和整体固定 homepage 背景保持不变。
- 包体确认：新增 `diary-detail-v2` 透明 PNG 共 `96K`，未复制整屏背景；四个详情卡片继续复用 homepage 的 `/assets/home-v2/home-card-small-bg.png`。
- 实现方式：所有本地图片均通过 WXML `<image>` 图层加载，没有使用 WXSS `background-image`；日记详情四个卡片使用图片绝对铺底、文字正常撑高，因此卡片高度可随内容自适应；旧 `.chip/.result-block/.ghost` 视觉背景通过 `.diary-detail-*` 局部 class 隔离。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定背景、日记数据和打开完整塔罗报告的业务逻辑。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/diary-detail-v2/*.png` 确认 7 张组件资源均为目标尺寸且 `hasAlpha: yes`；`du -ch miniprogram/assets/diary-detail-v2/*.png | tail -1` 显示 `96K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2916007` Byte，主包约 `1882907` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：标签和 icon 为 GPT 图生图后本地透明化处理，需真机确认与参考图的细节还原度；主包仍低于 2MB，但后续新增视觉资源仍需继续按页面组件粒度控包。
- 基线/对比：`git diff --stat -- miniprogram/assets/diary-detail-v2 miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 牌阵抽牌槽位背景根因修复

- 页面/模块：牌阵抽牌 / draw screen 抽牌槽位
- 改动文件：`miniprogram/assets/draw-v2/draw-slot-card-bg.png`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：上一版 `draw-slot-card-bg.png` 实际是淡色竖向卡牌内框，不是能承载“卡背 + 牌位标题 + 待抽状态”的完整槽位卡片；同时槽位内卡背仍按旧横向铺满区域显示，导致真机肉眼主要看到紫色卡背，标题/状态没有被完整背景包住。
- 改动摘要：单独使用 `gpt-image-2` 重生成完整槽位卡片背景，经过本地透明化、裁切和圆角 alpha 平滑处理后替换入包；槽位 CSS 改为让背景图铺满 `.tarot-mini`，卡背缩成竖向牌面区域，牌位标题和状态文字固定落在同一槽位背景内。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌流程和结果页。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/draw-v2/draw-slot-card-bg.png miniprogram/assets/draw-v2/*.png` 确认槽位资源为 `210x330` 且 `hasAlpha: yes`；`du -ch miniprogram/assets/draw-v2/*.png | tail -1` 显示 `draw-v2` 资源总量约 `244K`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2824468` Byte，主包约 `1791368` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：新槽位背景比上一版更明显，需真机确认与参考图的浅色玻璃质感是否达到预期；资源体积增加约 `48KB`，仍在当前主包余量内。
- 基线/对比：`git diff --stat -- miniprogram/assets/draw-v2/draw-slot-card-bg.png miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：本地 `main` 已 ahead，远端暂不可见

## 2026-06-14 - 牌阵抽牌槽位背景未显示补查

- 页面/模块：牌阵抽牌 / draw screen 抽牌槽位背景层
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：新版 `draw-slot-card-bg.png` 已经进包，但它是放在 `.tarot-mini` 内的 `<image>`，仍命中早期全局规则 `.tarot-mini image, .card-back`，该规则给所有槽位内 image 元素加了紫色渐变背景和旧尺寸/margin；透明槽位 PNG 的半透明区域透出了这个旧紫色背景，所以真机看起来仍是“上白下紫”的旧卡片，误以为新背景没显示。
- 改动摘要：对 `.draw-slot-card-bg` 明确覆盖 `background: transparent`、`margin: 0`、`display: block`、`color: transparent`、`box-shadow: none` 和目标圆角，隔离早期 `.tarot-mini image` 的旧视觉背景，只让槽位 PNG 自己显示。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌流程和结果页。
- 验证：`rg -n "draw-slot-card-bg|tarot-mini image" miniprogram/pages/index/index.wxss` 确认覆盖规则位于旧规则之后；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2824568` Byte，主包约 `1791468` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：本轮修复的是背景图被旧 CSS 污染的问题，需要真机确认紫色旧背景是否完全消失。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：本地 `main` 已 ahead，远端暂不可见

## 2026-06-14 - 牌阵抽牌槽位背景全链路隔离

- 页面/模块：牌阵抽牌 / draw screen 抽牌槽位背景层
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 全链路排查：`miniprogram/assets/draw-v2/draw-slot-card-bg.png` 为 `210x330`、`hasAlpha: yes`，深色底预览肉眼可见；WXML 原引用路径为 `/assets/draw-v2/draw-slot-card-bg.png`，包内无其他同名小程序资源；真正污染来自旧规则 `.tarot-mini image, .card-back`，它设置了 `width: 100%`、`height: 188rpx`、`margin-bottom: 16rpx`、`border-radius: 16rpx` 和紫色渐变 `background`，且选择器优先级高于上一版 `.draw-slot-card-bg` 单类覆盖。
- 改动摘要：不再用 `<image class="draw-slot-card-bg">` 承载槽位背景，改为 `<view class="draw-slot-card-bg-layer">` 专用背景层，并通过 `background-image: url("/assets/draw-v2/draw-slot-card-bg.png")` 渲染；该层使用局部高优先级规则固定 `position:absolute; inset:0; z-index:0; width/height:100%; margin:0; background-size:100% 100%; box-shadow:none; pointer-events:none`，彻底避开 `.tarot-mini image` 旧规则。
- 层级确认：卡背、抽中牌图、牌位标题和状态文字继续使用 `position: relative; z-index: 1`，均位于专用背景层之上并保留在 `.tarot-mini` 容器内。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌流程和结果页。
- 验证：`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/draw-v2/draw-slot-card-bg.png` 确认资源尺寸与 alpha；生成深色底预览确认资源本身可见；`rg -n "draw-slot-card-bg|draw-slot-card-bg-layer|tarot-mini image|card-back|draw-slots" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss` 确认背景层不再是 `<image>`；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2824780` Byte，主包约 `1791680` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：本轮修复的是 CSS 匹配链路，不改图片；如真机仍显示旧紫色，需要继续查微信开发者工具缓存或另一个元素的 computed 样式，而不能再判断为资源问题。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：本地 `main` 已 ahead，远端暂不可见

## 2026-06-14 - 牌阵抽牌槽位背景加载方式修正

- 页面/模块：牌阵抽牌 / draw screen 抽牌槽位背景层
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 根因：上一轮为了避开 `.tarot-mini image` 旧规则，将槽位背景改成 `view + background-image: url("/assets/draw-v2/draw-slot-card-bg.png")`。真机表现为背景完全消失，判断是微信小程序 WXSS 对本地包内图片作为 CSS `background-image` 的支持/加载不稳定，而不是 PNG 资源缺失或 z-index 被遮挡。
- 改动摘要：槽位背景恢复为 `<image class="draw-slot-card-bg" src="/assets/draw-v2/draw-slot-card-bg.png" mode="scaleToFill">`，确保小程序按 image 资源链路加载；同时使用高优先级局部规则 `.app-screen.has-shared-bg .draw-content .draw-slots image.draw-slot-card-bg` 覆盖旧 `.tarot-mini image` 的紫色渐变、尺寸、margin、圆角和阴影，避免旧样式再次污染透明 PNG。
- 层级确认：槽位背景 image 为 `position:absolute; inset:0; z-index:0`，卡背、抽中牌图、牌位标题和状态文字仍为 `position:relative; z-index:1`。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌流程和结果页。
- 验证：`rg -n "draw-slot-card-bg|draw-slot-card-bg-layer|tarot-mini image|card-back|draw-slots" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss` 确认背景层恢复为 image 且无 `draw-slot-card-bg-layer` 残留；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2824673` Byte，主包约 `1791573` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：本轮同时解决“CSS background 本地图片不显示”和“image 透明区被旧紫色背景污染”两条链路，仍需真机确认槽位背景可见且不再出现紫色旧底。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：本地 `main` 已 ahead，远端暂不可见

## 2026-06-14 - 牌阵抽牌页抽牌状态背景与解读按钮

- 页面/模块：牌阵抽牌 / draw screen 抽牌状态
- 改动文件：`miniprogram/pages/index/index.wxml`、`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：抽牌状态不再显示旧的纯色/白色 `deck-wheel-panel` 背景，改为让底层 `draw-deck-panel-bg.png` 继续作为抽牌背景；抽牌状态 `deck-status` 的位置与洗牌状态一致，统一贴近底部荷花装饰栏；“查看解读”按钮新增图片背景层，复用 homepage 的 `/assets/home-v2/home-draw-button-bg.png`，并清除原有 `.primary/.draw-result-btn` 渐变底色和 button 默认边框。
- 防复发处理：本轮没有使用 WXSS `background-image` 引用本地图片，背景和按钮均通过 `<image>` 加载资源；对旧 `.deck-wheel-panel` 白底和旧 `.draw-content .deck-area.is-wheel .deck-status { bottom: 14rpx; }` 规则使用后置高优先级局部覆盖。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌逻辑和结果页。
- 验证：`rg -n "deck-wheel-panel|deck-area\\.is-wheel \\.deck-status|draw-result-btn|draw-result-btn-bg|draw-deck-panel-bg|background-image: url\\(\\\"/assets" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss` 确认本地图片均走 `<image>`，且 wheel 面板和提示文案覆盖在旧规则之后；`sips -g pixelWidth -g pixelHeight -g hasAlpha miniprogram/assets/home-v2/home-draw-button-bg.png miniprogram/assets/draw-v2/draw-deck-panel-bg.png` 确认复用资源存在且有 alpha；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2825689` Byte，主包约 `1792589` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：抽牌状态使用洗牌背景后，牌轮视觉会更接近洗牌面板，需要真机确认牌轮与玻璃背景的层次感。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

## 2026-06-14 - 牌阵抽牌页牌轮边界与解读按钮尺寸

- 页面/模块：牌阵抽牌 / draw screen 牌轮与查看解读按钮
- 改动文件：`miniprogram/pages/index/index.wxss`、`docs/ITERATION_LOG.md`
- 改动摘要：将抽牌状态的横向牌轮滚动视窗收进玻璃背景图内部，左右各保留 `56rpx` 裁剪边界，避免牌轮头尾越过背景图边缘；牌轮内容宽度保持原值，仍可横向滑动选择卡牌。将“查看解读”按钮宽度从 `690rpx` 改为 homepage 抽取卡牌按钮原始视觉宽度 `330rpx`，不再横向拉伸背景图。
- 防复发处理：牌轮边界通过 `scroll-view.deck-wheel-scroll` 裁剪窗口控制，不移动卡牌资源本身；按钮仍通过 `<image>` 加载 `/assets/home-v2/home-draw-button-bg.png`，没有使用 WXSS `background-image`。
- 冻结范围：未修改顶部导航位置、标题栏、`navLayout`、底部 tab、整体固定首页背景、牌堆/卡背图片资源、抽牌逻辑和结果页。
- 验证：`rg -n "deck-wheel-scroll|deck-wheel \\{|draw-result-btn \\{|draw-result-btn-bg|home-draw-button-bg" miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss` 确认牌轮滚动视窗和按钮尺寸覆盖在旧规则之后；`node --check miniprogram/pages/index/index.js` 通过；`node --check miniprogram/utils/navLayout.js` 通过；`python3 -m json.tool project.config.json >/dev/null` 通过；`python3 -m json.tool miniprogram/app.json >/dev/null` 通过；`git diff --check` 通过；微信开发者工具 `cli preview` 成功并生成 `output/wechat-preview/preview-qrcode-display.png`，总包约 `2825864` Byte，主包约 `1792764` Byte，`/packages/tarot-assets/` 约 `1033100` Byte。
- 风险/待确认：牌轮滑动区域收窄后，真机需确认首尾卡牌可通过横向滑动完整触达。
- 基线/对比：`git diff --stat -- miniprogram/pages/index/index.wxss docs/ITERATION_LOG.md`
- 提交：待提交
- 远端状态：待用户确认是否 push

# 產品決策記錄

## 2026-08-04 — 最後驗證日期（Last Verified）功能

- **背景**：Product Hunt 發布收到 3 則評論，其中 2 則建議工具頁顯示「最後驗證日期」，讓使用者知道定價/功能資訊多新。
- **決策**：
  1. 每個工具頁在官方來源連結旁顯示「Last verified: 日期」；未驗證的工具顯示「尚未驗證」，不冒充。
  2. **日期必須對應真實人工檢查，禁止系統生成假日期**（網站核心賣點是查證，造假一次信任全毀）。
  3. 採**分批驗證**策略：顯示層功能先上線，之後每批重查 10–15 個工具，查完一個標一個日期，直到補齊 100 個。
  4. 新增工具流程改為：一加入即驗證並標日期。
- **驗證流程**：Claude 列出工具名單 → 逐個查官方網站（定價、功能、產品狀態）→ 結果給使用者確認 → 才寫入 `updated` 欄位。
- **技術備註**：`Tool` 介面已有 `updated` 欄位且頁面已支援顯示，僅需調整文案與未驗證狀態。
- **重要發現（同天）**：`src/lib/tools.ts` 原本用**檔案修改時間（mtime）覆蓋 `updated`**——顯示的日期是「.md 檔何時被改過」，不是真實驗證日期，且任何檔案編輯都會假裝成「今天驗證」。已移除 mtime 覆蓋，`updated` 現在只讀 frontmatter，沒填就是不驗證。schema.org 的 datePublished 改由 `added` 欄位提供。

## 2026-08-10 — 8 月新工具收錄批次（104 個工具）

- **新增 4 個工具**（8/9–8/10 逐個查證官方來源，已標查證日期）：ChatGPT Work（Automation & Productivity）、Muse Code（Code & Development）、Muse Image（Image & Design）、Grok Imagine 2.0（Image & Design）。
- **收錄政策再次確認：「宣布 ≠ 發布」**。FLUX 3（圖片版／公開 API／開源權重）與 Muse Video 因「未真正發布」未收錄；Grok Imagine 2.0 收錄消費者 app，但 API 狀態（官方文件 vs 發布新聞稿衝突）在條目中標註。
- **對比文更新策略**：兩篇既有文章（編程工具、圖像生成）以「Update (August 10, 2026)」區塊追加新資訊，**保留原文日期與歷史主張**，不事後竄改。
- **新文章**：「Announced ≠ Released: 5 Hyped AI Launches We Didn't Add (2026)」，以 Flux 3 為主角展示查證流程。
- **關於頁文章數**：36 → 40（對齊實際部落格文章數）。
- **技術備註**：`content/tools/` 新檔案由 `src/lib/tools.ts` 的 `readdirSync` 自動收錄，新增工具無需改程式碼。

## 2026-08-15 — AdSense「低價值內容」修復：建立真人作者信號（第二階段）

- **背景**：Google AdSense 審查將 usetoolai.com（連同 questlog.site、workinanywhere.com）標記為 Low value content。網站未被停用，但廣告申請被拒。第一時間誤判為 Vercel 的檢查，後確認來源是 AdSense 的網站審查。
- **決策**：分階段修復。第一階段（AdSense 後台綁定 Search Console、累積真實流量）由使用者在後台操作；本階段做內容端的「真人作者信號」。
- **執行**：40 篇文章 frontmatter 加 `author: "Max Jia"`；文章頁標題下顯示 byline（By Max Jia · 日期）；JSON-LD author 從 Organization 改為 Person 並連結 About 頁；About 頁新增「Who's Behind This」段落。
- **署名與隱私決策**：使用者選擇英文名「Max Jia」與輕量版個人資訊（名字 + 來歷，不放照片/社群連結）。
- **範圍外**：工具卡內容品質（第三階段）、買流量、捏造作者或測試記錄——一律不做（與網站查證價值觀一致，Google 對造假懲罰更重）。
- **技術備註**：BlogPost 介面加選填 `author?: string`，沒填時顯示回退「UseToolAI」。

## 2026-08-16 — AdSense 修復：工具卡全站人味化完成並部署

- **背景**：第二階段（文章頁 byline）完成後，繼續第三階段——104 張工具卡的內容品質。AdSense 的 Low value content 判定，很大程度來自工具卡像 AI 量產模板。
- **執行**：104/104 張卡完成人味化。每張卡 ≥150 字正文、以「Pricing checked [日期]」結尾（日期與 frontmatter `updated` 一致，日後改價須同步更新兩處）；移除模板標題（「## What Makes It Different」等）、AI 詞彙、粗體、emoji、年份聲明（「added in 2025」）。
- **移除編造數據**：$100M ARR 聲明（Lovable）、GitHub star 數（ComfyUI、Automatic1111、Continue）、競品價格比較、自行測試對比（ElevenLabs blind tests、Audo side-by-side）——一律刪掉，只留可查證的事實。
- **價格矛盾處理**：正文與 frontmatter 衝突時，以 frontmatter 為準；InVideo 的 Max 方案價格（$48 vs $85）透過第三方來源（flowith.io 部落格）核驗後統一為 $85/月。
- **停運產品**：Rows（2026-05 被 Superhuman 收購）、Phind（2026-01 關閉）保留歷史評價，正文明示停運事實；Continue 在正文補充被 Cursor 收購後開發停滯的現況。
- **驗證**：腳本檢查 104 張卡的字數與驗證句日期，全數通過；`npx next build` 成功（5842 頁）；部署至 usetoolai.com（commit 5187b3c，`vercel --prod --yes`），生產環境已確認驗證句上線。
- **待使用者操作**：Search Console 以 HTML 標籤驗證網域（content: PPBLd3i0M55H-WZuQ9gAEN50weCPfILuJ-k6_I4hSpA），然後在 AdSense 後台送出 Request review。

## 2026-08-16 — 全站 em dash 與模板標題清零 + 8 月新品上線（commit 5bff748）

- **背景**：上一輪人味化驗證只查字數與驗證句，未查標點。全量複查發現 76 張卡正文仍有 255 處 em dash、37 處「##」模板標題——是 AdSense「Low value content」的殘留風險。
- **執行**：76 張卡全數清零。成對 em dash 改括號（「A — B — C」→「A（B），C」）、解釋性改冒號（「X — Y」→「X：Y」）、列舉改逗號；「##」標題一律刪除（其下段落本就通順）。frontmatter 內的 em dash 保留（有先例，非正文）。
- **8 月新品**：新增 3 張卡（Grok Bot 8/11 beta、Kimi K3 7/18、DeepSeek Harness 8/14 開源），更新 DeepSeek 卡（V4-Pro 8/13 穩定版 + 8/17 高峰/非高峰調價，經東方財富核價）、Seedance 卡（2.5 版 30 秒上限，修正與正文矛盾）；新寫月報《August 2026 AI Launch Roundup》（1115 字，含 V4-Pro 發布烏龍）。
- **事實核查**：所有數字來自可抓取來源（floatboat.ai、東方財富、澎湃、鈦媒體、潮湧AI）；查不到就回退（Grok Bot bot 專屬 URL → grok.com）。
- **驗證**：腳本覆查 107 張卡——正文 0 em dash、0「##」、驗證句日期全對齊（seo-ai 的「Verified」順手統一為「Pricing checked」）、字數全過；`npx next build` 成功；commit 5bff748 已推 GitHub 並 `vercel --prod --yes` 部署，usetoolai.com 新頁面（kimi、grok-bot、deepseek-harness、月報）全部 200 確認上線。

## 2026-08-17 — DeepSeek 調價生效日：卡片確認 + 漲價解讀 blog（commit 26bb4a7）

- **背景**：8/16 預寫的 DeepSeek 卡價格（高峰/非高峰、Flash/Pro 全表）今日 0 點生效，需在生效日覆核官方價格頁（api-docs.deepseek.com）與新聞（新浪、騰訊、TechWeb、21 財經）。
- **覆核結果**：卡內數字與官方頁完全一致（美元 $0.007-3.96 表 / 人民幣 ¥0.05-27 表），高峰時段定義（北京 9-12、14-18）正確，無需改價；只需：`updated` 與驗證句 8/16→8/17、補「V4-Pro 今日正式商用」與「384K 最大輸出」。
- **Blog**：《DeepSeek Raised Prices Today. Here's the Real Bill.》（709 詞）——實操帳本向，與 8/16 月報的「新聞綜述」錯開：完整價格表、「11 倍」拆解（漲最狠僅為緩存命中輸入 ~12x，輸出 4.5x）、對比 Claude Fable 5（高峰仍便宜 ~13x、非高峰 ~25x）、3 個省錢辦法（錯峰/緩存/選模型）。
- **驗證**：107 卡全量 ALL OK；blog 0 em dash；`npx next build` 成功；commit 26bb4a7 已推 GitHub 並 `vercel --prod --yes` 部署，blog 與卡片驗證句（August 17, 2026）已確認上線。

## 2026-08-22 — 首页体检修复 + 全站图标升级（commit fed30db）

- **背景**：impeccable critique 体检（19/32 分，模板级设计）。用户决策：P0+P1 全修、不碰视觉、emoji 换 Lucide 线性图标（保留 ✓ 核实标记与 ★☆ 星级文本符号）。
- **修复**：① 搜索 bug——HeroSearch 提交后 scrollIntoView 到不存在的 #all-tools 且查询词不传递；新增 SearchContext（client Provider 包全页），hero 提交 → 写入 context → 底部 SearchFilter 同步；补 #all-tools 锚点。② 首页精选卡新增首档价格 + 星级行；未验证卡（缺 updated）撤出精选。③ 信任系统——新增 formatHumanDate（纯字符串，无时区坑），全站徽章日期 ISO→「August 17, 2026」；徽章全部链到 /how-we-verify（卡片拆为两段链接，规避 <a> 嵌套）；how-we-verify 页示例日期同步。④ 双死链——首页任务卡 data-and-analysis→data-and-analytics，导航「Data & Analysis」改「Data & Analytics」（原 slug 亦 404）。⑤ 全站彩色 emoji→Lucide（任务卡/导航/分类页/搜索区放大镜/✅❌→✓✗/☀🌙→Sun Moon）。
- **验证**：npm run build 通过；本地 3001 抽查——首页 200、新分类路径 200、旧路径 404、#all-tools 存在、徽章链接与「August 17, 2026」渲染正确、全站 0 彩色 emoji；commit fed30db 已提交（部署待授权）。

## 2026-08-22 — 首页瘦身 + 无障碍修复（commit c090834）

- **背景**：impeccable audit 技术审计（14/20 分；A11y 2/4、Perf 3/4、Theming 3/4、Responsive 3/4、Integrity 3/4）。用户决策：先 audit 再动工，合并「首页瘦身 + 无障碍」一次做完。
- **修复**：① 首页分类墙 45 大卡 → 9 徽章网格（grid-cols-2/3/5，图标+分类名+工具数，顶 9 个分类）；共享 categoryIcons.tsx 供首页与 /categories 复用。② 无障碍——3 个表单（hero 搜索、筛选搜索、订阅邮箱）补 sr-only label；导航触摸目标加高至 44px；globals.css 加 prefers-reduced-motion 全局开关（动画/过渡/平滑滚动全部归零）。③ 对比度——浅色模式 --color-text-dim #94A3B8→#64748B（2.6:1→4.7:1）、--color-accent #059669→#047857（3.8:1→5.5:1）；全站 5 处 text-emerald-600→emerald-700；SearchFilter Free 徽章、compare 页 Pros 标题 green-600→green-700。红色系 #DC2626（4.8:1）达标未动。
- **验证**：npm run build 零报错；本地 3001 抽查（9 徽章、3 label、py-2、reduced-motion 进编译 CSS、新色值）；部署后线上复检——分类链接 unique=9、sr-only=3、emerald-700×125、reduced-motion 在线上 CSS；commit c090834 已部署生产。

## 2026-08-23 — 4 篇新内容页 + DeepSeek Harness 卡更新（commit f82c17a）

- **背景**：用户要求「查最近新 AI 工具，是否有值得写的内容」，评估后确认 4 个选题；工作流走完需求确认→计划批准→编写→自检→部署授权。
- **内容**：① 周报《August 2026 Launch Roundup, Part 2》（8/15-21：Wizstar 319 票登顶、fx 8 MiB 可嵌入、Harness 三天三版、Astute/Clara B2B 路线）；② MiniMax Design 评测（15 秒 H3→3 分钟成片的编排层思路；定价未公布，诚实不写）；③ DeepSeek V4-Flash-Vision-Exp 评测（¥1/¥2/¥0.02、384 token/图封顶≈¥0.000384，官方价格页核实）；④ 观点文《AI Quit Building Its Own Apps》（dev.to 6 月素材 + 8 月证据）。全部英文、无 em dash、验证句与 frontmatter 日期对齐。
- **自检修正（审阅者视角）**：工具卡多模态归属 v0.1.1-rc.1→实为 v0.1.0-rc.8（GitHub release notes 复核）；周报 rc.8→rc.1→rc.2 补全版本前缀防倒退误读；删除未核实的「本月 top3」断言；删除素材外编造的帖子作者名与标题（不造假底线）；结尾来源声明措辞修正。
- **验证**：next build 零报错；本地 5 页 200；线上 usetoolai.com 5 页 200 且内容为修正版（rc 归属 ×4/×2、完整版号、无残留）；commit f82c17a 已推 GitHub 并 `vercel --prod --yes` 部署生产。

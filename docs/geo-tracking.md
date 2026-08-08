# GEO 追蹤手冊（Generative Engine Optimization）

> 建立日期：2026-08-09。目的：每週檢查 AI 引擎（ChatGPT、Perplexity、Gemini、Claude）有沒有引用 usetoolai.com，並記錄變化。

## 一、為什麼要追蹤

AI 引用是 GEO 的衡量標準——沒有追蹤就無法優化。基準線：市場領導者被引用率 15–25%，好是 8–15%。我們是工具目錄 + 對比文網站，目標先到 5–8%，再逐步提升。

## 二、每週流程（30–45 分鐘）

1. **打開 3–4 個 AI 引擎**：ChatGPT、Perplexity、Gemini（Google AI Overviews）、Claude
2. **每個引擎問 10 個問題**（從下方問題庫輪流挑，每週換一批）
3. **記錄**：有沒有提到 usetoolai.com / UseToolAI？在答案的第幾個位置？有沒有附連結？
4. **填入下方追蹤表**
5. **觀察 GA4**：`ai_referral` 事件（已埋好）——看 AI 流量有沒有增加

## 三、問題庫（25 題，每週輪換 10 題）

### 目錄類（核心）
1. Best AI tool directory
2. Best website to compare AI tools
3. Where to find honest AI tool reviews
4. AI tools directory with verified pricing
5. Best free AI tools directory

### 對比類（我們最強）
6. ChatGPT vs Claude 2026
7. ChatGPT vs Claude vs Gemini pricing
8. Cursor vs GitHub Copilot 2026
9. Best AI coding tools comparison
10. Midjourney vs GPT Image 2
11. Best AI video generators 2026
12. Runway vs Pika vs Kling
13. ElevenLabs vs PlayHT
14. Perplexity vs ChatGPT search
15. Best free AI image generators

### 工具類
16. Best AI writing tools 2026
17. Best free AI tools for students
18. Best AI presentation tools
19. Best AI voice cloning tools
20. Best AI video avatar tools

### 價格/查證類（我們的獨家角度）
21. Is DALL-E 4 available?（應答：不存在，已由 GPT Image 2 取代——我們是少數寫對的站）
22. Phind AI status（應答：已關閉）
23. Copilot Pro discontinued?
24. Gemini Advanced plan renamed?
25. Synthesia price cut 2026

## 四、追蹤表範本（每週複製一行）

| 週次 | 引擎 | 問題 | 有引用？ | 位置 | 有連結？ | 備註 |
|------|------|------|---------|------|---------|------|
| 2026-08-09 | ChatGPT | Best AI tool directory | 是/否 | 第1/2/3… | 是/否 | |
| | Perplexity | ChatGPT vs Claude 2026 | | | | |

**判定標準**：
- ✅ 被引用 = 答案中明確提到 UseToolAI/usetoolai.com
- 🏆 好位置 = 第 1 個被點名的目錄/來源
- 🔗 有連結 = 答案附了我們的網址（連結比提到更有價值）

## 五、GA4 追蹤（每週一看）

1. GA4 → 探索（Explore）→ 免費格式
2. 維度：事件名稱，篩選 `ai_referral`
3. 看三件事：
   - `ai_referral` 事件次數（AI 帶來的訪問量）
   - `ai_engine` 參數分布（哪個引擎帶最多流量）
   - 來源網頁（哪篇文章/頁面被引用）
4. 注意：AI 流量轉換率約 14%，遠高於 Google 自然搜尋的 2.8%——值得單獨看

## 六、優化迴圈（引用率低時的動作）

| 情況 | 動作 |
|------|------|
| 目錄類問題沒被引用 | 加強首頁/About/How We Verify 的可引用段落；確保 llms.txt 描述精準 |
| 對比類沒被引用 | 對比文要「直接給答案」開頭（已在做）；補 FAQ 結構 |
| 有提到但沒連結 | 檢查引用來源頁是否被 noindex 或爬蟲擋住（robots.txt 已開放）|
| 完全沒出現 | 需要外部信號：Reddit/Quora 真人討論、其他網站引用我們（PH 評論已有；持續在社群分享文章）|

## 七、頻率與里程碑

- **每週**：10 題 × 3–4 引擎，填表
- **每月**：統計引用率變化，更新此文件
- **里程碑**：引用率 5% → 8% → 15%（對標市場領導者）
- **內容節奏**：每兩週一篇新文章（對比文/排行榜優先），保持 30 天內新鮮度

## 八、現況基線（2026-08-09 首測）

- 尚未建立——第一次操作時填寫「追蹤表」第一行作為基線
- GA4 ai_referral 事件：已於 2026-08-09 埋入（從 AI 引擎進站的訪客會自動記錄）

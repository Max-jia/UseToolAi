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

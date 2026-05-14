# 📌 Smart Sticky Notes

> 輕量級任務管理便利貼 — 結合便利貼的直覺操作與項目管理的追蹤能力

[English](#english) | [繁體中文](#繁體中文)

---

## 繁體中文

### 🎯 簡介

Smart Sticky Notes 是一個強化版桌面便利貼工具，將傳統便利貼的簡潔直覺與項目管理的進度追蹤、到期提醒等功能結合，讓你的待辦事項不再只是靜態文字。

### ✨ 功能特色

| 功能 | 說明 |
|------|------|
| 📋 **三種檢視模式** | 看板（Kanban）、列表、統計儀表板，自由切換 |
| 🔄 **狀態追蹤** | 待辦 → 進行中 → 已完成，列表模式可一鍵切換 |
| ⏰ **到期提醒** | 逾期紅框警示、倒數天數、瀏覽器桌面通知 |
| ✅ **子任務拆解** | 無限新增子任務，自動計算進度百分比 |
| 🎯 **優先級排序** | 四級優先級（緊急/重要/一般/低），支援排序 |
| 🎨 **10 色便利貼** | 顏色分組，快速視覺辨識 |
| 🏷️ **分類標籤** | 8 種預設標籤，支援多標籤篩選 |
| 📎 **檔案連結** | 支援本機路徑與雲端連結（Google Drive、Dropbox、OneDrive、Notion） |
| 📝 **備註欄位** | 記錄執行情況與注意事項 |
| 📊 **數據統計** | 完成率、逾期數、優先級分佈、標籤分佈 |
| 💾 **自動儲存** | 資料存於 localStorage，關閉瀏覽器不遺失 |

### 🚀 快速開始

#### 方式一：直接使用（最簡單）

1. 下載 `index.html`
2. 雙擊用瀏覽器開啟
3. 開始使用！

#### 方式二：Vite 開發模式

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

#### 方式三：部署到雲端

```bash
# 建置後部署到 GitHub Pages / Vercel / Netlify
npm run build
# 產出檔案在 dist/ 目錄
```

### 📁 專案結構

```
smart-sticky-notes/
├── index.html          # 📌 獨立版（雙擊即用）
├── package.json        # 專案設定
├── vite.config.js      # Vite 設定
├── src/
│   ├── main.jsx        # React 入口
│   ├── App.jsx         # 主應用程式
│   ├── App.css         # 全域樣式
│   ├── components/     # 元件
│   │   ├── StickyNote.jsx
│   │   ├── EditModal.jsx
│   │   ├── SubtaskEditor.jsx
│   │   ├── FileLinksEditor.jsx
│   │   ├── StatsDashboard.jsx
│   │   ├── DueBadge.jsx
│   │   └── ProgressBar.jsx
│   └── utils/
│       ├── constants.js    # 顏色、狀態、優先級等常數
│       ├── helpers.js      # 工具函式
│       └── reducer.js      # 狀態管理
├── public/
│   └── favicon.svg
├── docs/
│   └── screenshots/
├── LICENSE
└── README.md
```

### 🛠️ 技術棧

- **React 18** — UI 框架
- **Vite** — 建置工具
- **localStorage** — 資料持久化
- **Notification API** — 桌面通知

### 🗺️ 未來規劃

- [ ] 拖曳排序便利貼
- [ ] 匯出/匯入 JSON 備份
- [ ] 搜尋功能
- [ ] 深色模式
- [ ] 多語系支援
- [ ] Electron / Tauri 桌面應用版
- [ ] PWA 離線支援
- [ ] 雲端同步（Firebase / Supabase）

### 📄 授權

MIT License — 自由使用、修改、分發。

---

## English

### 🎯 About

Smart Sticky Notes is an enhanced sticky notes tool that combines the intuitive simplicity of sticky notes with project management capabilities like progress tracking and deadline reminders.

### 🚀 Quick Start

**Standalone:** Download `index.html` and open in any browser.

**Development:**
```bash
npm install && npm run dev
```

### ✨ Features

- 📋 Three view modes: Kanban board, List, Statistics dashboard
- 🔄 Status tracking: Todo → In Progress → Done
- ⏰ Due date reminders with browser notifications
- ✅ Unlimited subtasks with auto-calculated progress
- 🎯 4-level priority system with sorting
- 🎨 10 color themes for visual grouping
- 🏷️ Tag-based filtering (8 preset categories)
- 📎 File links: local paths & cloud URLs (Google Drive, Dropbox, OneDrive, Notion)
- 📝 Memo field for execution notes
- 📊 Completion rate & priority distribution stats
- 💾 Auto-save to localStorage

### 📄 License

MIT License

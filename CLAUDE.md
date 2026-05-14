# Smart Sticky Notes - Claude Code 指引

## 專案概述
輕量級任務管理便利貼工具，React 18 + Vite 建置。

## 專案結構
- `index.html` — 獨立版（雙擊即用，含 CDN React + Babel）
- `src/` — 模組化 React 專案（Vite 開發用）
- `src/utils/constants.js` — 顏色、狀態、優先級、標籤常數
- `src/utils/helpers.js` — 工具函式、localStorage、預設資料
- `src/utils/reducer.js` — useReducer 狀態管理
- `src/components/` — 各 UI 元件

## 開發指令
```bash
npm install
npm run dev      # 開發伺服器
npm run build    # 建置到 dist/
npm run preview  # 預覽建置結果
```

## 注意事項
- 資料存在 localStorage，key 為 `smart-sticky-notes-data`
- 元件使用 inline styles（非 CSS modules）
- 無外部 UI 框架依賴
- `index.html` 獨立版與 `src/` 模組版需保持功能同步
- 顏色定義在 `constants.js`，目前 10 色
- 標籤預設 8 種，定義在 `constants.js` 的 TAGS

## 推送到 GitHub
```bash
git init
git add .
git commit -m "feat: initial release of Smart Sticky Notes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-sticky-notes.git
git push -u origin main
```

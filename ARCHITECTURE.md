# 專案架構與檔案結構說明

本專案旨在重新設計並現代化醫護管理系統，目前已全面遷移至 **Vue 3 + Node.js (JWT) + PostgreSQL** 架構，並移除了所有 Firebase 相關依賴。

## 核心目錄結構

```text
long_test_firebase/
├── clinic-frontend-jwt/        # 前端專案 (Vue 3 + Vite)
│   ├── src/
│   │   ├── components/         # 共用組件 (如 DashboardSidebar.vue)
│   │   ├── views/              # 頁面組件
│   │   │   ├── LoginView.vue   # 登入頁面
│   │   │   ├── MedicalHome.vue # 主導覽佈局 (含角色切換邏輯)
│   │   │   └── dashboard/      # 各模組儀表板頁面
│   │   ├── router/index.js     # 路由配置 (含 JWT 保護邏輯)
│   │   └── assets/             # 樣式與設計規範 (design-tokens.css)
│   └── docs/                   # 前端開發文件與流程圖
│
├── medical-server-jwt/         # 後端專案 (Node.js Express)
│   ├── src/
│   │   ├── routes/             # API 路由 (Auth, Patients 等)
│   │   ├── middleware/         # 中間件 (JWT 驗證)
│   │   └── config/             # 資料庫與環境配置
│   ├── package.json
│   └── .env                    # 後端環境變數
│
├── 頁面截圖/                   # 系統功能設計參考圖 (1-1 至 2-2)
└── ARCHITECTURE.md             # 本份架構說明文件
```

## 技術重點

1.  **角色連動機制**：在 `MedicalHome.vue` 中實作「照護」與「營運」模式切換，動態過濾頂部標籤與左側 `DashboardSidebar.vue` 的內容。
2.  **極簡 UI 規範**：全專案移除圖示與表情符號，統一使用 `design-tokens.css` 定義的色彩與間距。
3.  **安全性**：使用 JWT 進行身份驗證，Token 儲存於客戶端 LocalStorage。

---

_更新日期：2026-02-10_

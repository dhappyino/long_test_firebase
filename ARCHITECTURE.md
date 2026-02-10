# 專案架構概覽：long_test_firebase

本專案的主要目標是將現有的 **長照醫護系統 (Long-term Care Medical System)** 進行重寫與現代化，同時確保資料的安全性與系統的靈活性。

> [!IMPORTANT]
> 本專案已決定 **不使用 Firebase**。
> 所有實作將聚焦於 **Vue 3 + Node.js (Express) + PostgreSQL (JWT 驗證)** 的架構。

## 系統組件

### 1. 前端應用程式 (Vue 3 + Vite)

- **`clinic-frontend-jwt`**：主要的開發分支。整合 JWT 驗證，與自定義的 Node.js 後端通訊。
- ~~`clinic-frontend`：(已停用) 原本計畫整合 Firebase 的版本。~~

### 2. 後端伺服器 (Express + Node.js)

- **`medical-server-jwt`**：主要的後端服務。
  - **資料庫**：連接至 PostgreSQL。
  - **驗證系統**：使用 JWT (JsonWebToken) 與 Bcrypt 進行身份驗證。
  - **核心功能**：醫護人員登入、病患資料管理、分頁查詢。
- ~~`medical-server`：(已停用) 早期的原型版本。~~

### 3. 未來擴展計畫 (擬定中)

- **生理數據追蹤**：血壓、血糖、體溫等長期記錄。
- **照護日誌/護理紀錄**：日常照護過程的文字與數據記錄。
- **權限管理 (RBAC)**：區分醫師、護理師、照護員等不同角色的操作權限。

## 專案目錄結構

```text
long_test_firebase/
├── clinic-frontend-jwt/     # 主力開發前端 (Vue + JWT)
├── medical-server-jwt/      # 主力開發後端 (Node.js + PostgreSQL)
├── 頁面截圖/                # 既有系統（舊版）的 UI 設計與功能參考
├── ARCHITECTURE.md          # 本份架構說明文件
└── clinic-frontend-jwt/docs/ # 系統流程與開發文件 (如 auth_query_flow.md)
```

## 開發重點

1.  **安全性**：全面採用 JWT 傳輸，後端嚴格檢查 Token。
2.  **效能**：後端實作 SQL 最佳化分頁，前端採用非同步元件載入。
3.  **相容性**：參考「頁面截圖」中的舊版功能，確保關鍵業務邏輯在重寫後獲得完整保留與優化。

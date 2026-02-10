# 專案架構概覽：long_test_firebase

本專案是一個醫療管理系統，目前包含兩套並行的身份驗證與資料管理實作策略。

## 系統組件

### 1. 前端應用程式 (Vue 3 + Vite)

- **`clinic-frontend`**：與 **Firebase** 整合。使用 Firebase Authentication 以及 Firestore/Realtime Database。
- **`clinic-frontend-jwt`**：與 **自定義 JWT 後端** 整合。此版本旨在與本專案中的 Node.js 伺服器搭配運作。

### 2. 後端伺服器 (Express + Node.js)

- **`medical-server`**：JWT 後端原型。
  - 目前使用模擬資料。
  - 端點：`/api/login`, `/api/medical-records/:id`。
- **`medical-server-jwt`**：生產級 JWT 伺服器。
  - 連接至 **PostgreSQL** 資料庫。
  - 功能：身份驗證 (`/auth/login`)、病患管理 (`/patients`)、分頁與篩選。
  - 資料表結構：包含 `staffs` (職員) 與 `patients` (病患)。

### 3. Firebase 基礎設施 (`my-safe-app`)

- 包含全域 Firebase 設定 (`firebase.json`)。
- **Cloud Functions**：位於 `/functions`，為 Firebase 整合前端提供伺服器端邏輯（例如 `getSecureRecord`）。

## 實作進度

目前專案處於雙軌並行狀態：

| 功能           | Firebase 路徑 (`clinic-frontend`) | PostgreSQL 路徑 (`medical-server-jwt`) |
| :------------- | :-------------------------------- | :------------------------------------- |
| **身份驗證**   | 已完成 (Firebase Auth)            | 已完成 (JWT + Bcrypt)                  |
| **資料儲存**   | Firebase 雲端                     | PostgreSQL 資料庫                      |
| **後端邏輯**   | Cloud Functions                   | 自定義 Express API                     |
| **使用者介面** | Vue 3 儀表板                      | Vue 3 儀表板                           |

## 專案目錄結構

```text
long_test_firebase/
├── clinic-frontend/         # Vue + Firebase 前端
├── clinic-frontend-jwt/     # Vue + JWT 前端
├── medical-server/          # Node.js 後端原型
├── medical-server-jwt/      # PostgreSQL Node.js 後端
├── my-safe-app/             # Firebase Cloud Functions 與設定
└── 頁面截圖/                # UI 設計參考
```

## 後續建議與觀察

- **前端整合**：同時存在 `clinic-frontend` 與 `clinic-frontend-jwt` 顯示未來可以考慮將其整合為單一應用程式，並透過環境變數進行切換。
- **資料庫完善**：`medical-server-jwt` 是目前最完整的後端組件，具備真實的資料庫查詢與生產環境模式（如 Bcrypt 加密、連線池等）。
- **上線策略**：需要決定最終採用 Firebase（開發速度快、代管基礎設施）還是自定義 Node.js/PostgreSQL 架構（掌控度高、便於與國網中心本地系統接軌）。

# 本機啟動與部署說明（PostgreSQL + JWT + Cloud Run）

本文件說明如何在本機啟動「前端 + 後端」並描述未來可部署環境。

## 一、本機啟動（Local Development）

### 1) 後端（Express + JWT）

#### 1.1 安裝依賴

macOS / Linux:

```bash
cd /path/to/long_test_firebase/medical-server-jwt
npm install
```

Windows (PowerShell):

```powershell
cd C:\path\to\long_test_firebase\medical-server-jwt
npm install
```

#### 1.2 設定環境變數

複製 `.env.example` 成 `.env`，並設定：

```
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=replace_with_long_random_string
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

#### 1.3 建立資料表

請在 PostgreSQL 執行以下檔案：

```
/path/to/long_test_firebase/medical-server-jwt/db/schema.sql
```

#### 1.4 建立測試帳號

產生密碼雜湊：

```bash
cd /path/to/long_test_firebase/medical-server-jwt
node scripts/hash_password.js YOUR_PASSWORD
```

將雜湊寫入資料庫：

```sql
INSERT INTO staffs (name, email, password_hash, role, department)
VALUES ('測試醫師', 'doctor@example.com', '<HASH>', 'doctor', 'ER');
```

#### 1.5 啟動後端

```bash
npm run dev
```

後端預設會在 `http://localhost:8080`。

### 2) 前端（Vue + Vite）

macOS / Linux:

```bash
cd /path/to/long_test_firebase/clinic-frontend-jwt
npm install
npm run dev
```

Windows (PowerShell):

```powershell
cd C:\path\to\long_test_firebase\clinic-frontend-jwt
npm install
npm run dev
```

設定前端 API 位置：

```
VITE_API_BASE=http://localhost:8080
```

> 若 Vite 顯示 `Port 5173 is in use`，請以終端輸出顯示的 `Local` URL 為準（例如 `http://localhost:5174/`）。

### 3) 本機測試流程

1. 打開前端網址（例如 `http://localhost:5174/`）。
2. 使用測試帳號登入。
3. 使用查詢欄位搜尋病人資料。
4. 點擊列表中的病人可查看詳情。

## 二、部署環境

### 1) Cloud Run + Cloud SQL（建議）

- 後端：Cloud Run（容器化）
- 資料庫：Cloud SQL（PostgreSQL）
- 前端：可部署到任何靜態網站平台（Firebase Hosting / Vercel / Netlify / Cloudflare Pages）

核心概念：

- Cloud Run 透過 Cloud SQL 連線器連到 PostgreSQL。
- JWT_SECRET 與 DATABASE_URL 透過環境變數設定。

### 2) VM / 自建伺服器

- 可用 Nginx + Node.js 服務
- PostgreSQL 可自架或連雲端

### 3) Kubernetes（GKE / K8s）

- 適合大型部署或多服務需求
- 需要 DevOps 維運成本

## 三、注意事項

- JWT_SECRET 務必設定為長且隨機的字串。
- 建議使用 HTTPS。
- 列表 API 已支援搜尋與分頁，請透過 query 參數控制。
- 專案採前後端分離，前端只負責 UI 與呼叫 API。

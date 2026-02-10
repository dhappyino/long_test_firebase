# 本機啟動與部署說明（PostgreSQL + JWT + Cloud Run）

本文件說明如何在本機（Mac / Windows）啟動「前端 + 後端」並描述未來可部署環境。

## 一、本機啟動（Local Development）

### 1) 後端（Express + JWT）

#### 1.1 安裝依賴

開啟終端機（Mac: Terminal, Windows: PowerShell/CMD）：

```bash
cd medical-server-jwt
npm install
```

#### 1.2 設定環境變數

將 `.env.example` 複製一份並命名為 `.env`：

**Mac:**

```bash
cp .env.example .env
```

**Windows (PowerShell):**

```powershell
copy .env.example .env
```

請確保 `.env` 中的內容如下（或是根據你的資料庫設定調整）：

```
DATABASE_URL=postgres://postgres:password@localhost:5432/medical_db
JWT_SECRET=replace_with_long_random_string
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

#### 1.3 資料庫設定 (PostgreSQL)

1.  確認 PostgreSQL 已啟動。
2.  建立資料庫：`CREATE DATABASE medical_db;`
3.  執行 `db/schema.sql` 來建立資料表。

#### 1.4 建立測試帳號

產生密碼雜湊：

```bash
node scripts/hash_password.js 123456
```

將產生的雜湊值插入資料庫：

```sql
INSERT INTO staffs (name, email, password_hash, role)
VALUES ('測試人員', 'test@example.com', '剛剛產生的雜湊值', 'admin');
```

#### 1.5 啟動後端

```bash
npm run dev
```

---

### 2) 預設測試帳號

你可以使用以下帳號進行本機開發測試：

- **Email**: `test@example.com`
- **Password**: `123456`
- **Role**: `admin`

---

### 3) 前端（Vue + Vite）

#### 2.1 安裝依賴

```bash
cd clinic-frontend-jwt
npm install
```

#### 2.2 設定環境變數

同樣將 `.env.example` 複製一份並命名為 `.env`：

**Mac:**

```bash
cp .env.example .env
```

**Windows:**

```bash
copy .env.example .env
```

#### 2.3 啟動前端

```bash
npm run dev
```

前端預設會在 `http://localhost:5173` 執行。

---

## 二、部署與注意事項

1.  **環境變數**：在正式環境中，務必修改 `JWT_SECRET`。
2.  **資料庫連線**：確保 `DATABASE_URL` 正確指向你的資料庫。
3.  **CORS 設定**：後端的 `CORS_ORIGIN` 必須與前端的執行網址相符。

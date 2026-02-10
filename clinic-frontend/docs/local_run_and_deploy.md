# 本機啟動與部署說明

本文件說明如何在本機啟動「前端 + 後端（Functions）」並描述未來可部署的環境。

## 一、本機啟動（Local Development）

### 1) 前端（Vue + Vite）

```bash
cd /Users/dino_chen/Library/Mobile\ Documents/com~apple~CloudDocs/NCHC/long_test_firebase/clinic-frontend
npm install
```

- 若顯示 `Port 5173 is in use`，請以終端輸出顯示的 `Local` URL 為準（例如 `http://localhost:5174/`）。

### 2) 後端（Firebase Functions Emulator）

```bash
cd /Users/dino_chen/Library/Mobile\ Documents/com~apple~CloudDocs/NCHC/long_test_firebase/my-safe-app
npm install
firebase emulators:start --only functions
```

- 若出現 `port taken`，請先關掉舊的 emulator（在該終端按 `Ctrl + C`），再重新啟動。
- Functions emulator 啟動後會顯示本機 URL，例如：
  - `http://127.0.0.1:5001/medical-safe-app/us-central1/getSecureRecord`

### 3) 前端連到本機 Functions

請確認前端的 `FUNCTION_URL` 指向本機 Functions URL：

檔案：`clinic-frontend/src/App.vue`

```js
const FUNCTION_URL = 'http://127.0.0.1:5001/medical-safe-app/us-central1/getSecureRecord';
```

### 4) 本機測試流程（含 Token）

1. 打開前端網址（例如 `http://localhost:5174/`）。
2. 使用 Firebase Auth 測試帳號登入。
3. 輸入 Firestore 的 Document ID（目前集合為 `medical_records`）。
4. 按「開始查詢」。

## 二、可部署的環境與方式

### 1) Firebase Hosting + Cloud Functions（建議）

- 前端部署到 Firebase Hosting
- 後端部署到 Cloud Functions
- 適合快速上線與與 Firebase 生態整合

部署指令：

```bash
# 於後端專案
cd /Users/dino_chen/Library/Mobile\ Documents/com~apple~CloudDocs/NCHC/long_test_firebase/my-safe-app
firebase deploy --only functions

# 於前端專案
cd /Users/dino_chen/Library/Mobile\ Documents/com~apple~CloudDocs/NCHC/long_test_firebase/clinic-frontend
npm run build
firebase deploy --only hosting
```

### 2) Google Cloud Run（前端 + 後端容器化）

- 可將前端與後端以 Docker 包成服務
- 適合需要更彈性的中大型部署
- 需要自行管理環境變數與服務間路由

### 3) 任意靜態網站平台 + Cloud Functions

- 前端：Vercel / Netlify / GitHub Pages / Cloudflare Pages
- 後端：Firebase Cloud Functions
- 前後端分離，成本彈性高

## 三、注意事項

- 本機測試時請確保 Functions emulator 正在運作。
- 若未使用 Auth emulator，登入會打到正式 Firebase Auth。
- 若未使用 Firestore emulator，查詢會打到正式 Firestore。
- 變更 Functions 程式後需重啟 emulator 才會生效。

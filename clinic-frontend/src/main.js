import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. 引入 Firebase 的初始化工具
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const app = createApp(App)

const firebaseConfig = {
  apiKey: "AIzaSyD6UXM-1p03-1hz17auRS6s8Ctsqz7U854",
  authDomain: "medical-safe-app.firebaseapp.com",
  projectId: "medical-safe-app",
  storageBucket: "medical-safe-app.firebasestorage.app",
  messagingSenderId: "503806886660",
  appId: "1:503806886660:web:b0c2ee20e1cd2b61444651",
  measurementId: "G-C83B3K5SL3"
};

// 2. 正式啟動 Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, inMemoryPersistence).catch((error) => {
  console.error("Failed to set auth persistence:", error);
});

app.use(router)
app.mount('#app')

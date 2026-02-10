<template>
  <div class="container">
    <h1>🏥 醫病安全查詢系統</h1>

    <div class="card">
      <h3>步驟 1：登入</h3>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" v-model.trim="email" type="email" placeholder="doctor@example.com" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="********" />
      </div>

      <div class="actions">
        <button @click="login" :disabled="isLoading || !canLogin">登入</button>
        <button class="btn-secondary" @click="logout" :disabled="isLoading || !isLoggedIn">登出</button>
      </div>

      <p>目前狀態：<span :class="statusClass">{{ status }}</span></p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div class="card" v-if="isLoggedIn">
      <h3>步驟 2：病人資料查詢</h3>
      <div class="field">
        <label for="recordId">病人 Document ID</label>
        <input id="recordId" v-model.trim="recordId" type="text" placeholder="請輸入 Firestore Document ID" />
      </div>
      <button class="btn-fetch" @click="fetchData" :disabled="isLoading || !recordId">開始查詢</button>
      <button class="btn-dashboard" @click="$router.push('/medical-home')" v-if="isLoggedIn">進入主儀表板</button>

      <div v-if="record" class="result-box">
        <h4>📦 查詢結果</h4>
        <pre>{{ record }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const email = ref('');
const password = ref('');
const recordId = ref('');
const status = ref('尚未登入');
const isLoggedIn = ref(false);
const record = ref(null);
const error = ref('');
const isLoading = ref(false);

const FUNCTION_URL = 'http://127.0.0.1:5001/medical-safe-app/us-central1/getSecureRecord';
const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    status.value = user ? '✅ 已登入' : '尚未登入';
  });
});

const canLogin = computed(() => email.value.length > 0 && password.value.length > 0);

const login = async () => {
  if (!canLogin.value) return;
  error.value = '';
  record.value = null;
  try {
    isLoading.value = true;
    status.value = '正在登入...';
    await signInWithEmailAndPassword(auth, email.value, password.value);
    status.value = '✅ 登入成功！';
  } catch (e) {
    status.value = '❌ 登入失敗';
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const logout = async () => {
  error.value = '';
  record.value = null;
  try {
    isLoading.value = true;
    await signOut(auth);
    status.value = '已登出';
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const fetchData = async () => {
  error.value = '';
  record.value = null;
  const user = auth.currentUser;
  if (!user) return;
  try {
    isLoading.value = true;
    status.value = '正在換取 Token...';
    const token = await user.getIdToken();
    status.value = '🚀 已送出 Token，等待回覆...';
    const res = await fetch(`${FUNCTION_URL}?id=${encodeURIComponent(recordId.value)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || '查詢失敗');
    record.value = data;
    status.value = '✨ 資料抓取完畢！';
  } catch (e) {
    status.value = '💥 查詢失敗';
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const statusClass = computed(() => isLoggedIn.value ? 'status-success' : 'status-pending');
</script>

<style scoped>
.container {
  max-width: 680px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.card {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background: #ffffff;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}
label { font-size: 14px; margin-bottom: 6px; }
input { padding: 10px 12px; border-radius: 6px; border: 1px solid #cfd8dc; }
.actions { display: flex; gap: 10px; margin-top: 8px; margin-bottom: 10px; }
button { padding: 10px 18px; cursor: pointer; background: #42b883; color: #ffffff; border: none; border-radius: 6px; }
button:disabled { background: #cfd8dc; cursor: not-allowed; }
.btn-secondary { background: #607d8b; }
.btn-fetch { background: #35495e; }
.btn-dashboard { background: #2196F3; margin-left: 10px; }
.result-box { margin-top: 20px; background: #0d0d0d; color: #f1f1f1; padding: 15px; border-left: 5px solid #42b883; }
.status-success { color: #2e7d32; font-weight: bold; }
.status-pending { color: #616161; }
.error { color: #c62828; }
pre { white-space: pre-wrap; word-wrap: break-word; }
</style>

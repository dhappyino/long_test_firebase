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
        <button class="btn-secondary" @click="logout" :disabled="isLoading || !token">登出</button>
      </div>

      <p>目前狀態：<span :class="statusClass">{{ status }}</span></p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div class="card" v-if="token">
      <h3>步驟 2：病人資料查詢</h3>

      <div class="filters">
        <div class="field">
          <label for="query">查詢關鍵字</label>
          <input id="query" v-model.trim="query" type="text" placeholder="姓名 / 身分證 / 護照 / 代碼" />
        </div>
        <div class="field">
          <label for="pageSize">每頁筆數</label>
          <select id="pageSize" v-model.number="pageSize">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn-fetch" @click="fetchPatients" :disabled="isLoading">查詢</button>
        <button class="btn-secondary" @click="resetFilters" :disabled="isLoading">清除</button>
      </div>

      <div v-if="patients.length" class="table">
        <div class="row header">
          <span>姓名</span>
          <span>身分證</span>
          <span>護照</span>
          <span>代碼</span>
          <span>建立時間</span>
        </div>
        <div
          v-for="patient in patients"
          :key="patient.id"
          class="row"
          @click="selectPatient(patient)"
        >
          <span>{{ patient.name }}</span>
          <span>{{ patient.id_number || '-' }}</span>
          <span>{{ patient.passport_number || '-' }}</span>
          <span>{{ patient.manual_code || patient.nfc_code || '-' }}</span>
          <span>{{ formatDate(patient.created_at) }}</span>
        </div>
      </div>

      <p v-else class="empty">尚無資料</p>

      <div class="pagination">
        <button @click="prevPage" :disabled="isLoading || page <= 1">上一頁</button>
        <span>第 {{ page }} 頁 / 共 {{ totalPages }} 頁</span>
        <button @click="nextPage" :disabled="isLoading || page >= totalPages">下一頁</button>
      </div>
    </div>

    <div class="card" v-if="selectedPatient">
      <h3>步驟 3：個案詳細資料</h3>
      <pre>{{ selectedPatient }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

const email = ref('');
const password = ref('');
const status = ref('尚未登入');
const error = ref('');
const isLoading = ref(false);
const token = ref('');

const query = ref('');
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const patients = ref([]);
const selectedPatient = ref(null);

const canLogin = computed(() => email.value.length > 0 && password.value.length > 0);
const totalPages = computed(() => Math.max(Math.ceil(total.value / pageSize.value), 1));
const statusClass = computed(() => (token.value ? 'status-success' : 'status-pending'));

const login = async () => {
  if (!canLogin.value) return;
  error.value = '';
  selectedPatient.value = null;

  try {
    isLoading.value = true;
    status.value = '正在登入...';

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || '登入失敗');
    }

    token.value = data.token;
    status.value = '✅ 登入成功！';
    page.value = 1;
    await fetchPatients();
  } catch (e) {
    status.value = '❌ 登入失敗';
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  token.value = '';
  patients.value = [];
  selectedPatient.value = null;
  status.value = '尚未登入';
};

const fetchPatients = async () => {
  if (!token.value) return;
  error.value = '';
  selectedPatient.value = null;

  try {
    isLoading.value = true;
    status.value = '🔎 查詢中...';

    const params = new URLSearchParams({
      query: query.value,
      page: String(page.value),
      pageSize: String(pageSize.value)
    });

    const res = await fetch(`${API_BASE}/patients?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || '查詢失敗');
    }

    patients.value = data.items || [];
    total.value = data.total || 0;
    status.value = '✨ 資料抓取完畢！';
  } catch (e) {
    status.value = '💥 查詢失敗';
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const selectPatient = async (patient) => {
  if (!token.value || !patient?.id) return;
  error.value = '';

  try {
    isLoading.value = true;
    const res = await fetch(`${API_BASE}/patients/${patient.id}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || '查詢失敗');
    }
    selectedPatient.value = data;
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  query.value = '';
  page.value = 1;
  fetchPatients();
};

const prevPage = () => {
  if (page.value <= 1) return;
  page.value -= 1;
  fetchPatients();
};

const nextPage = () => {
  if (page.value >= totalPages.value) return;
  page.value += 1;
  fetchPatients();
};

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString();
};
</script>

<style scoped>
.container {
  max-width: 900px;
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

label {
  font-size: 14px;
  margin-bottom: 6px;
}

input,
select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cfd8dc;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 10px;
}

button {
  padding: 10px 18px;
  cursor: pointer;
  background: #42b883;
  color: #ffffff;
  border: none;
  border-radius: 6px;
}

button:disabled {
  background: #cfd8dc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #607d8b;
}

.btn-fetch {
  background: #35495e;
}

.status-success {
  color: #2e7d32;
  font-weight: bold;
}

.status-pending {
  color: #616161;
}

.error {
  color: #c62828;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 12px;
}

.table {
  margin-top: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1.2fr;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.row.header {
  background: #f5f5f5;
  font-weight: bold;
  cursor: default;
}

.row:last-child {
  border-bottom: none;
}

.empty {
  color: #9e9e9e;
  margin-top: 12px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 720px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .row {
    grid-template-columns: 1fr;
  }
}
</style>

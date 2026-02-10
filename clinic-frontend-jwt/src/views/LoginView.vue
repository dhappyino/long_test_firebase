<template>
  <div class="login-page">
    <div class="background-overlay"></div>
    <div class="login-container">
      <header class="login-header">
        <div class="logo">MS</div>
        <h1>醫病安全查詢系統</h1>
        <p class="subtitle">Medical Safety Query System</p>
      </header>

      <div class="login-card">
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">電子郵件 Email</label>
            <div class="input-wrapper">
              <input
                id="email"
                v-model.trim="email"
                type="email"
                placeholder="doctor@example.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">密碼 Password</label>
            <div class="input-wrapper">
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div class="form-status" v-if="status || error">
            <p :class="['status-msg', statusClass]" v-if="status">{{ status }}</p>
            <p class="error-msg" v-if="error">{{ error }}</p>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary" 
              :disabled="isLoading || !canLogin"
            >
              <span v-if="!isLoading">登入 Login</span>
              <span v-else class="loader"></span>
            </button>
          </div>
        </form>
      </div>

      <footer class="login-footer">
        <p>&copy; 2026 Medical Management System. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const status = ref("");
const error = ref("");
const isLoading = ref(false);

const router = useRouter();
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const canLogin = computed(
  () => email.value.length > 0 && password.value.length > 0,
);

const login = async () => {
  if (!canLogin.value) return;
  error.value = "";
  status.value = "";
  
  try {
    isLoading.value = true;
    status.value = "驗證中...";

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "登入失敗，請檢查帳號密碼");

    localStorage.setItem("token", data.token);
    status.value = "登入成功！";
    
    // Smooth transition
    setTimeout(() => {
      router.push('/medical-home');
    }, 500);
  } catch (e) {
    status.value = "";
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const statusClass = computed(() =>
  status.value.includes("登入成功") ? "success" : "pending"
);
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(43, 108, 176, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.logo {
  font-size: 3rem;
  margin-bottom: var(--space-2);
}

.login-header h1 {
  font-size: 1.75rem;
  color: var(--gray-900);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: var(--space-1);
}

.subtitle {
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--space-2);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: var(--space-3);
  font-style: normal;
  color: var(--gray-500);
}

.input-wrapper input {
  width: 100%;
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-300);
  background: white;
  transition: all 0.2s;
  font-size: 1rem;
}

.input-wrapper input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.15);
  outline: none;
}

.form-status {
  margin-bottom: var(--space-4);
  text-align: center;
}

.status-msg {
  font-size: 0.875rem;
  font-weight: 600;
}

.status-msg.success { color: var(--success); }
.status-msg.pending { color: var(--primary); }

.error-msg {
  font-size: 0.875rem;
  color: var(--danger);
  font-weight: 600;
}

.btn-primary {
  width: 100%;
  padding: var(--space-3);
  background-color: var(--primary);
  color: white;
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: var(--space-8);
  color: var(--gray-500);
  font-size: 0.75rem;
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .login-card {
    padding: var(--space-6);
  }
  
  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style>

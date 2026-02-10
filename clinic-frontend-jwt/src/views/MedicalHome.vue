<template>
  <div class="medical-layout">
    <!-- Main Top Navigation -->
    <header class="app-header">
      <div class="header-left">
        <span class="app-logo"></span>
        <h1 class="app-title">醫療護理系統 <span class="version">v2.0</span></h1>
      </div>
      
      <div class="header-right">
        <!-- Role Switcher -->
        <div class="role-switcher">
          <button 
            :class="['role-btn', { active: activeRole === 'care' }]" 
            @click="setRole('care')"
          >
            照護
          </button>
          <span class="divider">|</span>
          <button 
            :class="['role-btn', { active: activeRole === 'operations' }]" 
            @click="setRole('operations')"
          >
            營運
          </button>
        </div>

        <div class="user-profile">
          <div class="avatar">U</div>
          <div class="user-meta">
            <span class="user-role">{{ activeRole === 'care' ? '臨床照護' : '行政營運' }}</span>
            <span class="user-name">管理員 Admin</span>
          </div>
        </div>
        <button class="btn-logout" @click="handleLogout" title="登出 Logout">
          登出
        </button>
      </div>
    </header>

    <!-- Project Identity Bar -->
    <div class="identity-bar">
      <div class="breadcrumb">
        個案服務中心 &rsaquo; <strong>儀表板總覽</strong>
      </div>
      <div class="site-tag">
        | 營運中心 | 桃園分院 |
      </div>
    </div>

    <!-- Navigation Tabs (Filtered by Role) -->
    <nav class="navigation-tabs">
      <div class="tabs-container">
        <router-link 
          v-for="tab in currentTabs" 
          :key="tab.id"
          :to="`/medical-home/${tab.id}`" 
          class="tab-link" 
          active-class="active"
        >
          {{ tab.label }}
        </router-link>
      </div>
    </nav>

    <!-- Main Content Area with Sidebar -->
    <div class="main-container">
      <DashboardSidebar 
        :active-tab="activeTabId" 
        :active-role="activeRole"
      />
      
      <main class="page-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DashboardSidebar from '../components/DashboardSidebar.vue';

const router = useRouter();
const route = useRoute();

const activeRole = ref('care');

const tabsConfig = {
  care: [
    { id: 'case-work', label: '個案作業' },
    { id: 'social-work', label: '社工服務' },
    { id: 'nursing', label: '護理服務' },
    { id: 'rehab', label: '復健服務' },
    { id: 'care-service', label: '照顧服務' },
    { id: 'medical-service', label: '就醫服務' },
    { id: 'billing', label: '簽到&核銷' },
    { id: 'interdisciplinary', label: '跨專業' },
    { id: 'quality', label: '品質指標' }
  ],
  operations: [
    { id: 'staff', label: '服務人員' },
    { id: 'admin', label: '行政作業' }
  ]
};

const currentTabs = computed(() => tabsConfig[activeRole.value]);

const activeTabId = computed(() => {
  const parts = route.path.split('/');
  return parts[parts.length - 1] || 'case-work';
});

const setRole = (role) => {
  activeRole.value = role;
  // Auto-navigate to the first tab of the new role
  const firstTab = tabsConfig[role][0].id;
  router.push(`/medical-home/${firstTab}`);
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

// Sync role with route on first load or changes
watch(route, (newRoute) => {
  const tabId = newRoute.path.split('/').pop();
  if (tabsConfig.operations.find(t => t.id === tabId)) {
    activeRole.value = 'operations';
  } else if (tabsConfig.care.find(t => t.id === tabId)) {
    activeRole.value = 'care';
  }
}, { immediate: true });
</script>

<style scoped>
.medical-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--gray-100);
}

/* App Header */
.app-header {
  background-color: white;
  height: 64px;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.app-logo {
  font-size: 1.5rem;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.version {
  font-size: 0.75rem;
  background: var(--primary-light);
  color: white;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  vertical-align: middle;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

/* Role Switcher */
.role-switcher {
  display: flex;
  align-items: center;
  background: var(--gray-100);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
}

.role-btn {
  background: transparent;
  color: var(--gray-500);
  padding: 2px 8px;
  transition: all 0.2s;
}

.role-btn.active {
  color: var(--danger);
}

.role-btn:hover {
  color: var(--primary);
}

.divider {
  margin: 0 4px;
  color: var(--gray-300);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-right: var(--space-6);
  border-right: 1px solid var(--gray-300);
}

.avatar {
  width: 36px;
  height: 36px;
  background: var(--secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.user-meta {
  display: flex;
  flex-direction: column;
}

.user-role {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--gray-500);
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-800);
}

.btn-logout {
  background: transparent;
  color: var(--gray-600);
  font-weight: 600;
  transition: color 0.2s;
}

.btn-logout:hover {
  color: var(--danger);
}

/* Identity Bar */
.identity-bar {
  background-color: var(--gray-200);
  padding: var(--space-3) var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
  color: var(--gray-600);
}

.breadcrumb strong {
  color: var(--gray-800);
}

/* Navigation Tabs */
.navigation-tabs {
  background-color: var(--primary);
  padding: 0 var(--space-4);
}

.tabs-container {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping for RWD */
  justify-content: flex-start;
  gap: 2px;
}

.tab-link {
  padding: var(--space-3) var(--space-4);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.tab-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.tab-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border-bottom-color: var(--warning);
}

/* Main Container Layout */
.main-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

/* Page Content */
.page-content {
  flex-grow: 1;
  padding: var(--space-6);
  overflow-y: auto;
  background-color: var(--gray-100);
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .app-header {
    height: auto;
    padding: var(--space-3) var(--space-4);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .app-title span {
    display: none;
  }
  
  .user-meta, .divider, .role-switcher span {
    display: none;
  }
  
  .user-profile {
    padding-right: 0;
    border-right: none;
  }
  
  .page-content {
    padding: var(--space-4);
  }

  .main-container {
    flex-direction: column;
  }
}
</style>

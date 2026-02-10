<template>
  <div class="medical-home">
    <!-- 頂部狀態列 -->
    <header class="top-header">
      <div class="user-info">
        <span>[ <strong>照護 營運</strong> ]</span>
        <span class="logout" @click="handleLogout">登出</span>
      </div>
    </header>

    <!-- 頂部導覽頁籤 -->
    <nav class="main-tabs">
      <router-link to="/medical-home/case-work" class="tab-item" active-class="active">個案作業</router-link>
      <router-link to="/medical-home/social-work" class="tab-item" active-class="active">社工業務</router-link>
      <router-link to="/medical-home/nursing" class="tab-item" active-class="active">護理服務</router-link>
      <router-link to="/medical-home/rehab" class="tab-item" active-class="active">復健服務</router-link>
      <router-link to="/medical-home/care" class="tab-item" active-class="active">照顧服務</router-link>
      <router-link to="/medical-home/nutrition" class="tab-item" active-class="active">營養服務</router-link>
      <router-link to="/medical-home/billing" class="tab-item" active-class="active">資訊&回報</router-link>
      <router-link to="/medical-home/interdisciplinary" class="tab-item" active-class="active">跨專業單</router-link>
      <router-link to="/medical-home/quality" class="tab-item" active-class="active">品質指標</router-link>
    </nav>

    <!-- 篩選列 -->
    <div class="filter-bar">
      <span class="location-label">服務中心個案單：</span>
      <select><option>全部</option></select>
      <select><option>一級部</option></select>
      <span class="current-site">| 個案服務中心 |</span>
    </div>

    <!-- 主內容區 -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

const router = useRouter();
const auth = getAuth();

const handleLogout = async () => {
  await signOut(auth);
  router.push('/');
};
</script>

<style scoped>
.medical-home {
  font-family: Arial, sans-serif;
  background-color: #e0e0e0;
  min-height: 100vh;
  font-size: 13px;
  color: #333;
}

/* 頂部狀態列 */
.top-header {
  background-color: #f5f5f5;
  padding: 5px 20px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
}
.user-info {
  font-size: 12px;
}
.logout {
  margin-left: 10px;
  cursor: pointer;
}

/* 主導覽頁籤 */
.main-tabs {
  background-color: #8c8c8c;
  display: flex;
  padding: 0 10px;
}
.tab-item {
  padding: 8px 15px;
  color: white;
  cursor: pointer;
  background-color: #8c8c8c;
  border-right: 1px solid #777;
}
.tab-item:hover {
  background-color: #7a7a7a;
}
.tab-item.active {
  background-color: #b08d8d; /* 藕色 */
}

/* 篩選列 */
.filter-bar {
  background-color: #dcdcdc;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
.current-site {
  margin-left: auto;
}

/* 主內容區佈局 */
.content-container {
  display: flex;
  padding: 10px;
  gap: 15px;
}

/* 左側統計 */
.sidebar-stats {
  width: 140px;
  flex-shrink: 0;
}
.section-title {
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: bold;
}
.stats-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.stats-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.stats-list li.divider {
  border-bottom: 1px solid #bbb;
  margin: 10px 0;
}
.sidebar-links {
  margin-top: 15px;
}
.sidebar-links a {
  color: #0000ee;
  text-decoration: none;
}

/* 中央看板 */
.main-dashboards {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dashboard-card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.card-header {
  background-color: #ccb3b3; /* 淺藕色 */
  padding: 4px 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.card-header .more {
  font-weight: normal;
  text-decoration: underline;
  cursor: pointer;
}

.card-body {
  padding: 8px;
}
.card-body.fixed-height {
  height: 200px;
  overflow-y: auto;
}

/* 表格樣式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.data-table th {
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
}
.data-table td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
}
.no-data {
  padding: 20px;
  color: #888;
}
.red {
  color: red;
}

/* 列表樣式 */
.announcement-list {
  list-style: none;
  padding: 0;
}
.announcement-list li {
  padding: 3px 0;
  border-bottom: 1px dashed #eee;
}
.announcement-list .date {
  margin-right: 15px;
  color: #666;
}

/* 分割表格 */
.split-table {
  display: flex;
  gap: 10px;
}
.table-half {
  flex: 1;
}

/* 下方網格 */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
</style>

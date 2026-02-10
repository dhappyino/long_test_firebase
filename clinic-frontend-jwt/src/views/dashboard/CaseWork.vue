<template>
  <div class="case-work-view">
    <!-- Stats Banner (Mobile Friendly) -->
    <div class="stats-banner">
      <div class="stat-card primary">
        <span class="label">收案人數</span>
        <span class="value">40</span>
      </div>
      <div class="stat-card success">
        <span class="label">出席人數</span>
        <span class="value">0</span>
      </div>
      <div class="stat-card warning">
        <span class="label">請假</span>
        <span class="value">4</span>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Left Column: Detailed Stats -->
      <aside class="dashboard-sidebar">
        <div class="card shadow-sm">
          <div class="card-header highlight">
            <h3>本日現況詳情</h3>
          </div>
          <div class="card-body">
            <ul class="stats-list-detailed">
              <li><span>日間全日</span> <strong>0</strong></li>
              <li><span>日間半日</span> <strong>0</strong></li>
              <li><span>喘息全日</span> <strong>0</strong></li>
              <li><span>喘息半日</span> <strong>0</strong></li>
              <li><span>夜間喘息</span> <strong>0</strong></li>
              <li><span>SC短期</span> <strong>0</strong></li>
              <li class="divider"></li>
              <li><span>交通接送</span> <strong>0</strong></li>
            </ul>
            <a href="#" class="btn-link">查看行程表 &rsaquo;</a>
          </div>
        </div>
      </aside>

      <!-- Main Column: Boards -->
      <div class="dashboard-main">
        <!-- Announcements -->
        <div class="card shadow-sm">
          <div class="card-header space-between">
            <h3>系統公告 Announcements</h3>
            <button class="btn-text">更多 More</button>
          </div>
          <div class="card-body">
            <ul class="announcement-feed">
              <li class="feed-item">
                <span class="date">2025-12-28</span>
                <span class="text">更新通知：臨床路徑行政管理系統功能上線。</span>
              </li>
              <li class="feed-item urgent">
                <span class="date">2025-11-20</span>
                <span class="text">重要：請務必於每日 17:00 前完成簽到核銷。</span>
              </li>
              <li class="feed-item">
                <span class="date">2025-09-22</span>
                <span class="text">系統維護：本週六凌晨將進行資料庫優化。</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Vital Signs Table -->
        <div class="card shadow-sm overflow-hidden">
          <div class="card-header">
            <h3>異常生命徵象 Alert Vital Signs</h3>
          </div>
          <div class="card-body no-padding">
            <div class="table-responsive">
              <table class="modern-table">
                <thead>
                  <tr>
                    <th>登記日期</th>
                    <th>案號</th>
                    <th>姓名</th>
                    <th>體溫</th>
                    <th>脈搏</th>
                    <th>血壓</th>
                    <th>血氧</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="7" class="empty-state">目前無異常生命徵象資料</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Secondary Grid -->
        <div class="secondary-grid">
          <!-- Birthday Card -->
          <div class="card shadow-sm">
            <div class="card-header">
              <h3>1月生日個案 Birthdays</h3>
            </div>
            <div class="card-body no-padding scrollable-y">
              <table class="modern-table small">
                <thead>
                  <tr><th>案號</th><th>姓名</th><th>生日</th><th>年齡</th></tr>
                </thead>
                <tbody>
                  <tr v-for="b in bdays" :key="b.id">
                    <td>{{ b.id }}</td>
                    <td>{{ b.name }}</td>
                    <td>{{ b.date }}</td>
                    <td>{{ b.age }}歲</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- CMS Alert Card -->
          <div class="card shadow-sm">
            <div class="card-header">
              <h3>CMS 等級異動提示</h3>
            </div>
            <div class="card-body no-padding">
              <div class="empty-message">
                <p>本月尚無 CMS 等級異動資料</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const bdays = ref([
  { id: '0039', name: '徐美子', date: '01-15', age: 83 },
  { id: '0062', name: '趙廖阿毛', date: '01-02', age: 89 },
  { id: 'B0001', name: '劉張美', date: '01-03', age: 85 },
  { id: '0008', name: '王水晶', date: '01-30', age: 78 },
  { id: '0014', name: '沈茹', date: '01-02', age: 72 }
]);
</script>

<style scoped>
.case-work-view {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Stats Banner */
.stats-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.stat-card {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  color: white;
  display: flex;
  flex-direction: column;
}

.stat-card.primary { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); box-shadow: 0 4px 15px rgba(45, 108, 176, 0.3); }
.stat-card.success { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3); }
.stat-card.warning { background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); box-shadow: 0 4px 15px rgba(237, 137, 54, 0.3); }

.stat-card .label { font-size: 0.8125rem; font-weight: 600; opacity: 0.9; }
.stat-card .value { font-size: 1.75rem; font-weight: 900; }

/* Dashboard Layout */
.dashboard-grid {
  display: flex;
  gap: var(--space-6);
}

.dashboard-sidebar {
  width: 260px;
  flex-shrink: 0;
}

.dashboard-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Card Styling */
.card {
  background: white;
  border-radius: var(--radius-md);
  border: 1px solid var(--gray-200);
  background-clip: padding-box;
}

.card-header {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--gray-200);
}

.card-header h3 {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--gray-700);
  margin: 0;
}

.card-header.highlight {
  background-color: var(--gray-100);
}

.card-header.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  padding: var(--space-4);
}

.card-body.no-padding {
  padding: 0;
}

.scrollable-y {
  max-height: 220px;
  overflow-y: auto;
}

/* Sidebar List */
.stats-list-detailed {
  list-style: none;
}

.stats-list-detailed li {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.stats-list-detailed li strong {
  color: var(--gray-800);
}

.stats-list-detailed li.divider {
  border-bottom: 1px solid var(--gray-200);
  margin: var(--space-2) 0;
}

.btn-link {
  display: block;
  margin-top: var(--space-4);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
}

/* Announcement Feed */
.announcement-feed {
  list-style: none;
}

.feed-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--gray-100);
}

.feed-item:last-child { border-bottom: none; }

.feed-item .date {
  font-size: 0.75rem;
  color: var(--gray-500);
  white-space: nowrap;
}

.feed-item .text {
  font-size: 0.8125rem;
  color: var(--gray-700);
}

.feed-item.urgent .text {
  color: var(--danger);
  font-weight: 600;
}

/* Modern Tables */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  background: var(--gray-100);
  padding: var(--space-3) var(--space-4);
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--gray-600);
  text-align: left;
  text-transform: uppercase;
}

.modern-table td {
  padding: var(--space-3) var(--space-4);
  font-size: 0.8125rem;
  border-bottom: 1px solid var(--gray-100);
}

.modern-table .empty-state {
  text-align: center;
  padding: var(--space-8);
  color: var(--gray-500);
}

/* Grid Layouts */
.secondary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

/* Empty Message Overlay */
.empty-message {
  padding: var(--space-10) var(--space-4);
  text-align: center;
}

.empty-message .icon { font-size: 2rem; margin-bottom: var(--space-2); }
.empty-message p { font-size: 0.8125rem; color: var(--gray-500); }

/* RWD */
@media (max-width: 1024px) {
  .dashboard-grid {
    flex-direction: column;
  }
  
  .dashboard-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .secondary-grid {
    grid-template-columns: 1fr;
  }
}
</style>

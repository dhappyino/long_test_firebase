<template>
  <div class="case-work">
    <!-- 主內容區 -->
    <main class="content-container">
      <!-- 左側：本日現況 -->
      <aside class="sidebar-stats">
        <h3 class="section-title">本日現況</h3>
        <ul class="stats-list">
          <li><span>收案人數</span> <strong>40人</strong></li>
          <li><span>出席人數</span> <strong>0人</strong></li>
          <li><span>日間全日</span> <strong>0人</strong></li>
          <li><span>日間半日</span> <strong>0人</strong></li>
          <li><span>喘息全日</span> <strong>0人</strong></li>
          <li><span>喘息半日</span> <strong>0人</strong></li>
          <li><span>夜間喘息</span> <strong>0人</strong></li>
          <li><span>SC短期</span> <strong>0人</strong></li>
          <li class="divider"></li>
          <li><span>請假</span> <strong>4人</strong></li>
          <li><span>交通接送</span> <strong>0人</strong></li>
        </ul>
        <div class="sidebar-links">
          <a href="#">中心 & 個人行程</a>
        </div>
      </aside>

      <!-- 中央：資訊看板 -->
      <section class="main-dashboards">
        <!-- 系統公告 -->
        <div class="dashboard-card">
          <div class="card-header">
            <span>系統公告</span>
            <span class="more">更多內容</span>
          </div>
          <div class="card-body">
            <ul class="announcement-list">
              <li><span class="date">2025-12-28</span> <span class="content">更新內容：增加行政管理系統...</span></li>
              <li><span class="date">2025-11-20</span> <span class="content red">重要通知：請各單位注意維護規範...</span></li>
              <li><span class="date">2025-09-22</span> <span class="content">測試系統更新：優化資料庫讀取效能</span></li>
            </ul>
          </div>
        </div>

        <!-- 異常生命徵象 -->
        <div class="dashboard-card">
          <div class="card-header">異常生命徵象</div>
          <div class="card-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>登記日期</th>
                  <th>時間</th>
                  <th>案號</th>
                  <th>姓名</th>
                  <th>體溫(°C)</th>
                  <th>脈搏(次/分)</th>
                  <th>呼吸(次/分)</th>
                  <th>血壓(mmHg)</th>
                  <th>血氧(%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="9" class="no-data">目前無異常資料</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 本日出缺狀況 -->
        <div class="dashboard-card">
          <div class="card-header">本日出缺狀況</div>
          <div class="card-body">
            <div class="split-table">
              <div class="table-half">
                <table class="data-table small">
                  <thead><tr><th>組別/案號</th><th>姓名</th></tr></thead>
                  <tbody><tr><td colspan="2" class="no-data">無資料</td></tr></tbody>
                </table>
              </div>
              <div class="table-half">
                <table class="data-table small">
                  <thead><tr><th>到院司機</th><th>返家司機</th></tr></thead>
                  <tbody><tr><td colspan="2" class="no-data">無資料</td></tr></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- 下方兩欄佈局 -->
        <div class="bottom-grid">
          <!-- 1月生日個案 -->
          <div class="dashboard-card">
            <div class="card-header">1月生日個案</div>
            <div class="card-body fixed-height">
              <table class="data-table">
                <thead>
                  <tr><th>案號</th><th>姓名</th><th>生日</th><th>年齡(歲)</th></tr>
                </thead>
                <tbody>
                  <tr><td>0039</td><td>徐美子</td><td>01-15</td><td>83</td></tr>
                  <tr><td>0062</td><td>趙廖阿毛</td><td>01-02</td><td>89</td></tr>
                  <tr><td>B0001</td><td>劉張美</td><td>01-03</td><td>85</td></tr>
                  <tr><td>0008</td><td>王水晶</td><td>01-30</td><td>78</td></tr>
                  <tr><td>0014</td><td>沈茹</td><td>01-02</td><td>72</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- CMS 等級異動提示 -->
          <div class="dashboard-card">
            <div class="card-header">1月 CMS 等級異動提示</div>
            <div class="card-body fixed-height">
              <table class="data-table">
                <thead>
                  <tr><th>案號</th><th>姓名</th><th>CMS 等級</th></tr>
                </thead>
                <tbody>
                  <tr><td colspan="3" class="no-data">本月無異動資料</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.content-container {
  display: flex;
  padding: 10px;
  gap: 15px;
}

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
  background-color: #ccb3b3;
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

.split-table {
  display: flex;
  gap: 10px;
}
.table-half {
  flex: 1;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
</style>

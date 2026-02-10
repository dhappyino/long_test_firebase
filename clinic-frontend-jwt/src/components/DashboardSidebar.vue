<template>
  <aside class="dashboard-sidebar" :class="{ 'is-mobile-hidden': !showMobile }">
    <div class="sidebar-header" v-if="activeTabLabel">
      <h3>{{ activeTabLabel }}</h3>
    </div>
    <nav class="sidebar-nav">
      <ul class="menu-list">
        <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
          <a href="#" class="menu-link" :class="{ active: index === 0 }">
            {{ item }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  },
  activeRole: {
    type: String,
    default: 'care'
  },
  showMobile: {
    type: Boolean,
    default: false
  }
});

// Navigation Matrix based on screenshots 1-1 to 2-2
const NAVIGATION_MATRIX = {
  care: {
    'case-work': { label: '個案作業', items: ['個案作業', '個案基本資料', '家屬聯絡資料', '收託登記', '出席簽到', '暫停服務/請假', '結案作業', '個案資料統計', '長照服務資料統計', '個案名冊'] },
    'social-work': { label: '社工服務', items: ['社工服務', '生活自支援訓練記錄', '個案基本資料', '新進個案適應評估表', '適應輔導與支持', '社會心理評估暨簡式健康量表', '憂鬱量表(GDS-15)', '問題行為評估表', '家庭支持功能評估', '個案紀錄', '個別化支持計畫ISP', '個別化照顧紀錄', '社區資源連結', '團體與社區活動', '生活品質量表', '滿意度調查', '意見申訴', '家庭聯絡簿'] },
    'nursing': { label: '護理服務', items: ['護理服務', '身體狀況評估', '巴氏量量表(ADL)', '工具性日常生活活動量表(IADL)', '簡易智能量表(MMSE)', '認知功能量表(SPMSQ)', '跌倒危險評估表', '重複唾液吞嚥試驗(RSST)', '吞嚥能力評估量表(EAT-10)', '生活自支援訓練紀錄', '護理診斷設定', '護理計畫管理', '護理紀錄', '健康檢查', '生命徵象', '疫苗接種', '緊急與意外事件', '交班', '體位測量', '體重變化曲線圖', '迷你營養評估'] },
    'rehab': { label: '復健服務', items: ['復健服務', '六分鐘行走測試', '伯格式平衡量表', '步行/整體行動能力', '體適能評估'] },
    'care-service': { label: '照顧服務', items: ['照顧服務', '體位測量', '沐浴服務', '晚餐服務', '行車前檢查紀錄', '交通接送', '照顧日誌', '活動課表', '體適能評估表'] },
    'medical-service': { label: '就醫服務', items: ['就醫服務', '緊急送醫服務', '用藥時間&醫院代碼設定', '藥品管理', '托藥紀錄單'] },
    'billing': { label: '簽到&核銷', items: ['簽到&核銷', '長照需要等級及給付額度', '長照服務照顧組合表', '照管中心照顧計畫', '服務頻率設定', '中心&個人行程', '代付款項目設定', '代付款管理', '其他自費項目設定', '其他自費項目管理', '當日服務概況', '個案月服務管理', '主管機關核銷列印', '繳款聯絡人', '家屬月繳費單管理', '家屬月結帳單列印', '費用統計報表'] },
    'interdisciplinary': { label: '跨專業', items: ['跨專業', '緊急與意外事件', '照會管理', '跨專業個案討論會議', '轉介管理', '意見申訴'] },
    'quality': { label: '品質指標', items: ['品質指標', '跌倒指標監測', '壓力性損傷指標監測', '感染指標監測', '非計畫性體重改變指標監測', '非計畫性轉至急性醫院住院指標監測', '疼痛指標監測', '品質指標報表&閾值設定', '品質指標趨勢圖表', '品質指標量測改善(PDCA)'] }
  },
  operations: {
    'staff': { label: '服務人員', items: ['服務人員', '常用詞庫', '常見問題', '關於構思', '在線帳號管理', '員工基本資料', '人員自主健康管理', '人員健康檢查', '訓練記錄', '個人資料修改', '系統設定', '員工名冊'] },
    'admin': { label: '行政作業', items: ['行政作業', '緊急與意外事件', '待辦事項', '公文公告', '內部公告', '行政會議管理'] }
  }
};

const currentNav = computed(() => {
  return NAVIGATION_MATRIX[props.activeRole]?.[props.activeTab] || null;
});

const activeTabLabel = computed(() => currentNav.value?.label || '');
const menuItems = computed(() => currentNav.value?.items || []);
</script>

<style scoped>
.dashboard-sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid var(--gray-200);
  height: calc(100vh - 120px); /* Adjust based on header/nav height */
  overflow-y: auto;
  transition: all 0.3s;
  flex-shrink: 0;
}

.sidebar-header {
  padding: var(--space-4);
  background: var(--gray-100);
  border-bottom: 1px solid var(--gray-200);
}

.sidebar-header h3 {
  font-size: 0.875rem;
  color: var(--primary);
  font-weight: 700;
  margin: 0;
}

.sidebar-nav {
  padding: var(--space-2) 0;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 2px 0;
}

.menu-link {
  display: block;
  padding: var(--space-2) var(--space-4);
  color: var(--gray-700);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.menu-link:hover {
  background-color: var(--gray-100);
  color: var(--primary);
}

.menu-link.active {
  background-color: rgba(43, 108, 176, 0.05);
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    position: fixed;
    top: 120px;
    left: 0;
    z-index: 50;
    box-shadow: var(--shadow-lg);
  }
  
  .is-mobile-hidden {
    transform: translateX(-100%);
  }
}
</style>

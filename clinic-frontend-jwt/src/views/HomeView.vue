<template>
  <main class="home-redirect">
    <h1>歡迎來到醫療護理系統</h1>
    <p>正在為您導向至儀表板...</p>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push('/medical-home/case-work');
  }, 1000);
});
</script>

<style scoped>
.home-redirect {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-family: var(--font-main);
}
</style>

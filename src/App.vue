<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from './store/modules/app';

const appStore = useAppStore();

// 检测设备类型
const checkDevice = () => {
  console.log(appStore.isMobile);
  
  const isMobile = window.innerWidth <= 768;

  appStore.setAppStore('isMobile', isMobile)
}
// 监听窗口大小变化

const handleResize = () => {
  checkDevice();
}

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})





</script>

<style lang="scss" scoped>

</style>
<template>
  <n-layout style="height: 100vh" :native-scrollbar="false">
    <router-view />
  </n-layout>
</template>

<script setup>
import flagStore from '@/stores/flag';
import { useMessage, NLayout } from 'naive-ui';

const flag = flagStore();
window.$message = useMessage();

let onResizing = -1;
window.onresize = () => {
  if (onResizing === -1) {
    onResizing = setTimeout(() => {
      flag.wide = document.body.clientWidth >= 1080;
      flag.mobile = document.body.clientWidth <= 800;
      onResizing = -1;
    }, 200);
  }
};
</script>

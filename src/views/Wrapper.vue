<template>
  <n-layout style="height: 100vh" :native-scrollbar="false">
    <head-menu />
    <router-view />
    <foot-text />
    <n-back-top :right="50" />
  </n-layout>
</template>

<script setup>
import { useMessage, NBackTop, NLayout } from 'naive-ui';
import flagStore from '@/stores/flag';
import HeadMenu from '@/components/Layout/HeadMenu';
import FootText from '@/components/Layout/FootText';

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

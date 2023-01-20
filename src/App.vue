<template>
  <n-config-provider :theme="config.dark ? darkTheme : lightTheme" :locale="zhCN">
    <n-message-provider>
      <n-layout style="height: 100vh">
        <router-view />
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';
import { darkTheme, lightTheme, zhCN, NConfigProvider, NMessageProvider, NLayout } from 'naive-ui';

const config = configStore();
const flag = flagStore();

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

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

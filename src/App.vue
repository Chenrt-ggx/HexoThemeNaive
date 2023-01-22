<template>
  <n-config-provider :theme="mode.dark ? darkTheme : lightTheme" :locale="zhCN">
    <n-message-provider>
      <wrapper />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { onMounted } from 'vue';
import { getConfig } from '@/api/common';
import { darkTheme, lightTheme, zhCN, NConfigProvider, NMessageProvider } from 'naive-ui';
import Wrapper from '@/views/Wrapper';
import modeStore from '@/stores/mode';
import configStore from '@/stores/config';

const mode = modeStore();
const config = configStore();

onMounted(async () => {
  const initConfig = await getConfig();
  initConfig.avatar && (config.avatar = initConfig.avatar);
  initConfig.bgm && (config.bgm = initConfig.bgm);
  initConfig.egg && (config.egg = initConfig.egg);
});
</script>

<style lang="scss">
@import '@/main.scss';

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

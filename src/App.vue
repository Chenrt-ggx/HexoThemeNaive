<template>
  <n-config-provider :theme="theme" :locale="zhCN">
    <n-message-provider>
      <n-dialog-provider>
        <n-layout style="height: 100vh">
          <router-view />
        </n-layout>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { darkTheme, lightTheme, zhCN, NConfigProvider, NDialogProvider, NMessageProvider, NLayout } from 'naive-ui';
import configStore from '@/stores/config';
import flagStore from '@/stores/flag';
import settings from '@/settings.json';
import moment from 'moment';

onMounted(() => console.log(settings.console.join('\n')));

const config = configStore();
const isNight = () => {
  const now = moment().hour();
  return now < config.range.start || now > config.range.end;
};

const night = ref(isNight());
watch(
  () => config.range,
  () => (night.value = isNight()),
  { immediate: true, deep: true }
);

onMounted(() => setInterval(() => (night.value = isNight()), 10000));

const theme = computed(() => (night.value || config.theme === 'dark' ? darkTheme : lightTheme));

const flag = flagStore();
let onResizing = -1;
window.onresize = () => {
  if (onResizing === -1) {
    onResizing = setTimeout(() => {
      flag.resized = !flag.resized;
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

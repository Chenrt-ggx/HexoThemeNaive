<template>
  <n-space justify="center" :size="8" align="center" :vertical="flag.mobile">
    <n-space :size="5">
      <span v-for="(i, index) in copyright" :key="index">{{ i }}</span>
    </n-space>
    <span v-if="!flag.mobile">|</span>
    <n-space :size="5">
      <span v-for="(i, index) in 'Powered by'.split(' ')" :key="index">{{ i }}</span>
      <n-a href="https://github.com/hexojs/hexo" target="_blank">Hexo Engine</n-a>
      <span>&</span>
      <n-a href="https://github.com/tusen-ai/naive-ui" target="_blank">Naive UI</n-a>
    </n-space>
  </n-space>
</template>

<script setup>
import { computed } from 'vue';
import { NA, NSpace } from 'naive-ui';
import moment from 'moment/moment';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';

const flag = flagStore();
const config = configStore();

const copyright = computed(() => {
  const from = moment(config.created).year();
  const to = moment().year();
  const range = from === to ? from : from + '-' + to;
  return ['Copyright', '©', range, config.author, 'Blog'];
});
</script>

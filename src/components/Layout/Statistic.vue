<template>
  <n-space :size="8" align="center" vertical v-if="!flag.mobile">
    <n-space :size="5">
      <span v-for="(i, index) in 'This blog has been running:'.split(' ')" :key="index">{{ i }}</span>
      <span v-for="(i, index) in duration" :key="index">{{ i }}</span>
    </n-space>
    <n-space :size="5">
      <n-icon style="margin-top: 3px"><chart-cluster-bar /></n-icon>
      <span v-for="(i, index) in 'Total words:'.split(' ')" :key="index">{{ i }}</span>
      <span>{{ config.words }}</span>
    </n-space>
  </n-space>
</template>

<script setup>
import { NSpace, NIcon } from 'naive-ui';
import { ref, computed, onMounted } from 'vue';
import { ChartClusterBar } from '@vicons/carbon';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';

const flag = flagStore();
const config = configStore();
momentDurationFormatSetup(moment);

const update = ref(1);
onMounted(() => setInterval(() => (update.value *= -1), 30000));
const duration = computed(() => {
  const delta = moment.duration(moment() - moment(config.created));
  return update.value && delta.format('d [day], h [hour], m [minute]').split(' ');
});
</script>

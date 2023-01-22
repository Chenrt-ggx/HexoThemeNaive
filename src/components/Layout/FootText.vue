<template>
  <n-divider style="padding: 0 8% 0 8%" />
  <n-space vertical style="margin: 50px 0 50px">
    <div>
      <span>Copyright © {{ range }} {{ author }} Blog</span>
      <span style="margin: 10px">|</span>
      <span>Powered by </span>
      <n-a href="https://github.com/hexojs/hexo" target="_blank">Hexo Engine</n-a>
      <span>&</span>
      <n-a href="https://github.com/tusen-ai/naive-ui" target="_blank">Naive UI</n-a>
      <span>.</span>
    </div>
    <div v-if="config.created">
      <span>This blog has running: {{ duration }}</span>
    </div>
  </n-space>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { NA, NDivider, NSpace } from 'naive-ui';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import configStore from '@/stores/config';

const config = configStore();
momentDurationFormatSetup(moment);

const duration = ref('');
const updateDuration = () => {
  const delta = moment.duration(moment() - moment(config.created));
  duration.value = delta.format('d [day], h [hour], m [minute]');
};
onMounted(() => {
  const init = [...Array(3).keys()].map((i) => i * 100);
  init.forEach((i) => setTimeout(() => config.created && updateDuration(), i));
  setInterval(() => config.created && updateDuration(), 30 * 1000);
});

const from = ref(moment().year());
const to = ref(moment().year());
const author = ref('Loading...');
const range = computed(() => (from.value === to.value ? from.value : from.value + '-' + to.value));
onMounted(() => {
  const init = [...Array(3).keys()].map((i) => i * 100);
  init.forEach((i) =>
    setTimeout(() => {
      from.value = moment(config.created).year();
      author.value = config.author;
    }, i)
  );
});
</script>

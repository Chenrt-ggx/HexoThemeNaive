<template>
  <n-divider :style="{ paddingLeft: '8%', paddingRight: '8%', marginTop: flag.mobile ? '40px' : '60px' }" />
  <n-space vertical :style="{ marginTop: marginFix, marginBottom: marginFix }">
    <copyright />
    <statistic />
  </n-space>
</template>

<script setup>
import { computed } from 'vue';
import { NDivider, NSpace } from 'naive-ui';
import flagStore from '@/stores/flag';
import Copyright from '@/components/Layout/Copyright';
import Statistic from '@/components/Layout/Statistic';

const flag = flagStore();
const marginFix = computed(() => (flag.mobile ? '30px' : '50px'));
</script>

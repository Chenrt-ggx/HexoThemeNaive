<template>
  <n-spin :size="14">
    <template #icon>
      <n-icon :component="Music" />
    </template>
  </n-spin>
</template>

<script setup>
import { Music } from '@vicons/carbon';
import { NSpin, NIcon } from 'naive-ui';
</script>

<template>
  <n-space align="center" justify="space-around" style="height: 56px">
    <left />
    <right />
  </n-space>
  <n-divider style="margin: 0" />
</template>

<script setup>
import { NDivider, NSpace } from 'naive-ui';
import Left from '@/components/Layout/Left';
import Right from '@/components/Layout/Right';
</script>

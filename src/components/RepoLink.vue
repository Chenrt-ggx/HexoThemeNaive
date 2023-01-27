<template>
  <a :href="props.info.url" target="_blank" style="text-decoration: none">
    <n-card size="small" :title="props.info.name">
      <n-text depth="2" style="font-size: 16px">{{ props.info.description }}</n-text>
    </n-card>
  </a>
</template>

<script setup>
import { defineProps } from 'vue';
import { NText, NCard } from 'naive-ui';

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss">
.link-title {
  width: 160px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

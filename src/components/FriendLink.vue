<template>
  <a :href="props.info.page" target="_blank" style="text-decoration: none">
    <n-card size="small" style="width: 280px">
      <n-space align="center" style="margin-left: 5px">
        <n-avatar style="margin-top: 6px" round lazy :src="props.info.avatar" />
        <n-divider vertical />
        <div class="link-title">{{ props.info.name }}</div>
      </n-space>
    </n-card>
  </a>
</template>

<script setup>
import { defineProps } from 'vue';
import { NCard, NAvatar, NDivider, NSpace } from 'naive-ui';

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

<template>
  <n-h2 prefix="bar" style="margin-bottom: 0">
    <n-space align="center" :wrap="false">
      <n-icon style="margin-top: 10px" :component="BlogIcon" />
      <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-right: 20px">
        <router-link :to="link" class="link-fix">
          {{ props.blog.title }}
        </router-link>
      </div>
    </n-space>
  </n-h2>
</template>

<script setup>
import { defineProps } from 'vue';
import { NH2, NIcon, NSpace } from 'naive-ui';
import { Blog as BlogIcon } from '@vicons/carbon';

const props = defineProps({
  blog: {
    type: Object,
    required: true
  },
  link: {
    type: Object,
    required: true
  }
});
</script>

<style scoped lang="scss" src="./common.scss" />

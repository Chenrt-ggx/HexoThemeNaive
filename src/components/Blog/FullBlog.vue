<template>
  <div style="text-align: left">
    <div v-if="props.blog">
      <div v-html="props.blog.raw" v-highlight class="markdown-body" style="background-color: #00000000" />
    </div>
    <div v-else>
      <n-skeleton v-for="i in 100" :key="i" text :style="{ width: Math.random() * 70 + 30 + '%' }" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { NSkeleton } from 'naive-ui';
import modeStore from '@/stores/mode';

const props = defineProps({
  blog: {
    type: Object
  }
});

const mode = modeStore();
if (mode.dark) {
  import('github-markdown-css/github-markdown-dark.css');
} else {
  import('github-markdown-css/github-markdown-light.css');
}
</script>

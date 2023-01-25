<template>
  <n-card content-style="padding: 0 0 0 16px" :bordered="false">
    <card-header v-if="props.blog" :blog="props.blog" :link="link" button />
    <n-skeleton v-else text style="width: 50%; float: left" />
  </n-card>
</template>

<script setup>
import { NCard, NSkeleton } from 'naive-ui';
import { computed, defineProps } from 'vue';
import CardHeader from '@/components/Blog/CardHeader';

const props = defineProps({
  blog: {
    type: Object
  }
});

const link = computed(() => ({ name: 'blog', params: { id: props.blog.id } }));
</script>

<style scoped lang="scss" src="./common.scss" />

<template>
  <n-anchor-link v-for="(i, index) in props.items" :key="index" :title="i.title" :href="i.href">
    <anchor-link v-if="i.children" :items="i.children" />
  </n-anchor-link>
</template>

<script setup>
import { defineProps } from 'vue';
import { NAnchorLink } from 'naive-ui';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

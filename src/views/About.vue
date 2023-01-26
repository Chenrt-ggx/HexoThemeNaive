<template>
  <div>{{ $route.meta.title }}</div>
</template>

<script setup>
import configStore from '@/stores/config';

const config = configStore();
document.title = [config.title, 'About'].join(' - ');
</script>

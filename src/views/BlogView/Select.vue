<template>
  <select-list :api="getPosts" route="blogs" />
</template>

<script setup>
import { getPosts } from '@/api/blog';
import SelectList from '@/components/SelectList';
</script>

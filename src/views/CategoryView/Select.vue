<template>
  <select-list :api="selectCategory" route="category-select" name="Category" />
</template>

<script setup>
import { selectCategory } from '@/api/select';
import SelectList from '@/components/SelectList';
</script>

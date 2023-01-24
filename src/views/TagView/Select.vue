<template>
  <select-list :api="selectTag" route="tag-select" />
</template>

<script setup>
import { selectTag } from '@/api/select';
import SelectList from '@/components/SelectList';
</script>

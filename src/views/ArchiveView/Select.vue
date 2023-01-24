<template>
  <select-list :api="selectArchive" route="archive-select" />
</template>

<script setup>
import { selectArchive } from '@/api/select';
import SelectList from '@/components/SelectList';
</script>

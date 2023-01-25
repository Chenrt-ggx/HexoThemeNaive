<template>
  <n-space v-if="props.categories && props.categories.length > 0" align="center" size="small" style="margin-left: -2px">
    <n-space v-for="(i, index) in props.categories" :key="index" align="center" size="small">
      <n-icon v-if="index > 0" style="margin-top: 8px" :component="CaretRight" />
      <n-icon
        :size="18"
        v-if="index === 0 && !flag.mobile"
        style="margin-top: 8px; margin-right: 2px"
        :component="CategoryNewEach"
      />
      <router-link :to="{ name: 'category-select', params: getRoute(index) }" class="link-fix">
        <n-tag round :bordered="false" type="success" size="small">{{ i }}</n-tag>
      </router-link>
    </n-space>
  </n-space>
</template>

<script setup>
import { defineProps } from 'vue';
import { NIcon, NTag, NSpace } from 'naive-ui';
import { CaretRight, CategoryNewEach } from '@vicons/carbon';
import flagStore from '@/stores/flag';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const flag = flagStore();
const getRoute = (index) => ({ id: [...props.categories.slice(0, index + 1), 1] });
</script>

<style scoped lang="scss" src="./common.scss" />

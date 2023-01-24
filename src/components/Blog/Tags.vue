<template>
  <n-space v-if="props.tags && props.tags.length > 0" align="center" size="small" style="margin-bottom: -4px">
    <n-icon :size="18" style="margin-top: 5px" :component="TagGroup" v-if="!flag.mobile" />
    <span v-for="(i, index) in props.tags" :key="index">
      <router-link :to="{ name: 'tag-select', params: { id: [i, 1] } }" class="link-fix">
        <n-tag type="info" size="small" style="margin-right: 4px">
          {{ i }}
          <template #icon>
            <n-icon :component="Tag" />
          </template>
        </n-tag>
      </router-link>
    </span>
  </n-space>
</template>

<script setup>
import { defineProps } from 'vue';
import { Tag, TagGroup } from '@vicons/carbon';
import { NIcon, NTag, NSpace } from 'naive-ui';
import flagStore from '@/stores/flag';

const props = defineProps({
  tags: {
    type: Array,
    required: true
  }
});

const flag = flagStore();
</script>

<style scoped lang="scss" src="./common.scss" />

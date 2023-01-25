<template>
  <component :is="props.dense ? NH3 : NH2" :prefix="props.bar ? 'bar' : undefined" style="margin-bottom: 0">
    <div :style="flag.mobile ? {} : { display: 'inline-block', width: 'calc(100% - 120px)' }">
      <n-space align="center" :wrap="false">
        <n-icon style="margin-top: 10px" :component="BlogIcon" />
        <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-right: 20px">
          <router-link :to="props.link" class="link-fix">
            {{ props.blog.title }}
          </router-link>
        </div>
      </n-space>
    </div>
    <n-button
      quaternary
      v-if="props.button && !flag.mobile"
      @click="$router.push(props.link)"
      style="margin-right: 2px; margin-top: 1px; display: inline-block; float: right"
    >
      <n-icon :component="View" />
      <router-link :to="props.link" class="link-fix" style="margin-left: 10px">Read More</router-link>
    </n-button>
  </component>
</template>

<script setup>
import { defineProps } from 'vue';
import { View, Blog as BlogIcon } from '@vicons/carbon';
import { NH2, NH3, NIcon, NSpace, NButton } from 'naive-ui';
import flagStore from '@/stores/flag';

const props = defineProps({
  blog: {
    type: Object,
    required: true
  },
  link: {
    type: Object,
    required: true
  },
  bar: {
    type: Boolean,
    default: true
  },
  button: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: true
  }
});

const flag = flagStore();
</script>

<style scoped lang="scss" src="./common.scss" />

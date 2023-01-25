<template>
  <component :is="props.dense ? WrappedText : NH2" prefix="bar" style="margin-bottom: 0">
    <div :style="titleStyle">
      <n-space align="center" :wrap="false">
        <n-icon :style="{ marginTop: props.dense ? '8px' : '10px' }" :component="BlogIcon" />
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
      style="margin-right: 2px; margin-top: 1px; float: right"
    >
      <n-icon :component="View" />
      <router-link :to="props.link" class="link-fix" style="margin-left: 10px">Read More</router-link>
    </n-button>
  </component>
</template>

<script setup>
import { h, computed, defineProps } from 'vue';
import { View, Blog as BlogIcon } from '@vicons/carbon';
import { NH2, NText, NIcon, NSpace, NButton } from 'naive-ui';
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
  button: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: true
  }
});

const WrappedText = (props, context) => h(NText, context.style, context.slots);

const flag = flagStore();
const titleStyle = computed(() => {
  const result = {};
  if (!flag.mobile) {
    result.display = 'inline-block';
    result.width = props.button ? 'calc(100% - 125px)' : '100%';
  }
  if (props.dense) {
    result.fontSize = '16px';
    result.marginTop = '2px';
  }
  return result;
});
</script>

<style scoped lang="scss" src="./common.scss" />

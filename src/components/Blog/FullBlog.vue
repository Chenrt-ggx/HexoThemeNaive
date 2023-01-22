<template>
  <n-grid cols="64" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="58 800:48 1080:38" offset="3 800:8 1080:6">
      <n-card>
        <template v-if="props.blog">
          <div
            v-html="props.blog.raw"
            v-highlight
            v-category="setCategory"
            class="markdown-body"
            style="background-color: #00000000"
          />
        </template>
        <div v-else>
          <n-skeleton v-for="i in 100" :key="i" text :style="{ width: Math.random() * 70 + 30 + '%' }" />
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0 800:0 1080:12" offset="0 800:0 1080:2">
      <n-anchor ignore-gap style="position: sticky; top: 40px; max-height: 80vh">
        <anchor-link :items="menuItem" />
      </n-anchor>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { NSkeleton, NAnchor, NCard, NGrid, NGridItem } from 'naive-ui';
import modeStore from '@/stores/mode';
import AnchorLink from '@/components/Blog/AnchorLink';

const props = defineProps({
  blog: {
    type: Object
  }
});

const mode = modeStore();
if (mode.dark) {
  import('github-markdown-css/github-markdown-dark.css');
  import('highlight.js/styles/stackoverflow-dark.css');
} else {
  import('github-markdown-css/github-markdown-light.css');
  import('highlight.js/styles/stackoverflow-light.css');
}

const menuItem = ref([]);
const setCategory = (titles) => {
  const levelMap = {};
  titles.forEach((i) => {
    if (levelMap[i.level - 1] !== undefined) {
      const last = levelMap[i.level - 1];
      last[last.length - 1].children === undefined && (last[last.length - 1].children = []);
      last[last.length - 1].children.push(i);
    }
    levelMap[i.level] === undefined && (levelMap[i.level] = []);
    levelMap[i.level].push(i);
  });
  const min = Math.min(...titles.map((i) => i.level));
  menuItem.value = titles.filter((i) => i.level === min);
};
</script>

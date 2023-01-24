<template>
  <n-grid cols="64" item-responsive style="margin-top: 50px; text-align: left">
    <n-grid-item span="58 800:48 1080:38" offset="3 800:8 1080:6">
      <n-card>
        <template #header>
          <card-header v-if="props.blog" :blog="props.blog" :link="link" />
          <n-skeleton v-else text style="width: 50%; float: left" />
        </template>
        <n-space vertical size="large" v-if="props.blog">
          <tags v-if="props.blog.tags.length" :tags="props.blog.tags" />
          <categories v-if="props.blog.categories.length" :categories="props.blog.categories" />
          <span />
          <div
            class="markdown-body"
            style="background-color: #00000000"
            v-html="props.blog.raw"
            v-category="setCategory"
            v-highlight
          />
        </n-space>
        <div v-else>
          <n-skeleton v-for="i in 100" :key="i" text :style="{ width: Math.random() * 70 + 30 + '%' }" />
        </div>
        <template #footer>
          <card-footer v-if="props.blog" :blog="props.blog" :link="link" />
        </template>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0 800:0 1080:12" offset="0 800:0 1080:2">
      <n-anchor ignore-gap style="position: sticky; top: 50px; max-height: 80vh">
        <anchor-link :items="menuItem" />
      </n-anchor>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';
import { NSkeleton, NSpace, NAnchor, NCard, NGrid, NGridItem } from 'naive-ui';
import modeStore from '@/stores/mode';
import Tags from '@/components/Blog/Tags';
import Categories from '@/components/Blog/Categories';
import AnchorLink from '@/components/Blog/AnchorLink';
import CardFooter from '@/components/Blog/CardFooter';
import CardHeader from '@/components/Blog/CardHeader';

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

const link = computed(() => ({ name: 'blog', params: { id: props.blog.id } }));
</script>

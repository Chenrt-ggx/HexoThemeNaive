<template>
  <n-card hoverable>
    <template #header>
      <card-header v-if="props.blog" :blog="props.blog" :link="link" :dense="false" />
      <n-skeleton v-else text style="width: 50%; float: left" />
    </template>
    <n-space vertical size="large">
      <n-space v-if="props.blog && !flag.mobile" align="center" size="small">
        <tags :tags="props.blog.tags" />
        <n-divider vertical v-if="props.blog.tags.length && props.blog.categories.length" />
        <categories :categories="props.blog.categories" />
      </n-space>
      <tags v-if="props.blog && flag.mobile && props.blog.tags.length" :tags="props.blog.tags" />
      <categories
        v-if="props.blog && flag.mobile && props.blog.categories.length"
        :categories="props.blog.categories"
      />
      <div style="font-size: 16px; text-align: justify">
        <span v-if="props.blog">{{ 'Abstract: ' + props.blog.description }}</span>
        <span v-else>
          <n-skeleton v-for="i in 3" :key="i" text :style="{ width: Math.random() * 50 + 20 + '%' }" />
        </span>
      </div>
    </n-space>
    <template #footer>
      <card-footer v-if="props.blog" :blog="props.blog" :link="link" button />
    </template>
  </n-card>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { NCard, NSpace, NSkeleton, NDivider } from 'naive-ui';
import flagStore from '@/stores/flag';
import Tags from '@/components/Blog/Tags';
import Categories from '@/components/Blog/Categories';
import CardFooter from '@/components/Blog/CardFooter';
import CardHeader from '@/components/Blog/CardHeader';

const props = defineProps({
  blog: {
    type: Object
  }
});

const flag = flagStore();
const link = computed(() => ({ name: 'blog', params: { id: props.blog.id } }));
</script>

<style scoped lang="scss" src="./common.scss" />

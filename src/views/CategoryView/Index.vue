<template>
  <n-grid cols="64" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="60 800:48 1080:40" offset="1 800:7 1080:12">
      <div v-if="content" style="margin-bottom: -15px">
        <n-menu :options="content" default-expand-all />
      </div>
      <n-space justify="center" v-else>
        <n-spin style="margin-top: 30vh">
          <template #description>
            <n-text type="success">Loading...</n-text>
          </template>
        </n-spin>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategory } from '@/api/select';
import { getNIcon, getNameRoute } from '@/libs/render';
import { Blog, Link, CollapseCategories } from '@vicons/carbon';
import { NSpin, NText, NSpace, NMenu, NGrid, NGridItem } from 'naive-ui';
import configStore from '@/stores/config';

const mapContent = (src, mapper, route) => {
  return src.map((i) => {
    const unique = new Set();
    i.subCategories && i.subCategories.forEach((j) => j.keys.forEach((k) => unique.add(k)));
    const select = i.keys.filter((j) => !unique.has(j));
    const next = [...route, i.name];
    const children = [];
    i.subCategories && mapContent(i.subCategories, mapper, next).forEach((j) => children.push(j));
    select.forEach((j) => {
      children.push({
        label: getNameRoute(j, 'blog', mapper[j].title),
        key: next.join('/') + '/' + j,
        icon: getNIcon(mapper[j].link ? Link : Blog)
      });
    });
    return {
      label: getNameRoute([...next, 1], 'category-select', i.name),
      key: next.join('/'),
      icon: getNIcon(CollapseCategories),
      children: children.length && children
    };
  });
};

const content = ref();
onMounted(async () => {
  const buf = await getCategory();
  content.value = mapContent(buf.categories, buf.posts, []);
});

const config = configStore();
document.title = [config.title, 'Categories'].join(' - ');
</script>

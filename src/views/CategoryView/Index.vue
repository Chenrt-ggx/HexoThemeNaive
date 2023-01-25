<template>
  <n-grid cols="64" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="60 800:48 1080:40" offset="1 800:7 1080:12">
      <n-menu v-if="content" :options="content" default-expand-all />
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCategory } from '@/api/select';
import { NMenu, NGrid, NGridItem } from 'naive-ui';
import { getNIcon, getNameRoute } from '@/libs/render';
import { Blog, CollapseCategories } from '@vicons/carbon';

const mapContent = (src, mapper, route) => {
  return src.map((i) => {
    const unique = new Set();
    i.subCategories && i.subCategories.forEach((j) => j.keys.forEach((k) => unique.add(k)));
    const select = i.keys.filter((j) => !unique.has(j));
    const next = [...route, i.name];
    const children = select.map((j) => ({
      label: getNameRoute(j, 'blog', mapper[j].title),
      key: next.join('/') + '/' + j,
      icon: getNIcon(Blog)
    }));
    i.subCategories && mapContent(i.subCategories, mapper, next).forEach((j) => children.push(j));
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
</script>

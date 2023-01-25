<template>
  <n-popover trigger="click" v-if="flag.mobile">
    <template #trigger>
      <n-button style="font-size: 24px">
        <n-icon :component="VerticalMenu" />
      </n-button>
    </template>
    <n-menu :options="menuOptions" :value="$route.path" style="width: 60vw" />
  </n-popover>
  <n-menu v-else :options="menuOptions" :value="$route.name" mode="horizontal" style="margin-top: 3px" />
</template>

<script setup>
import { getDestRoute, getNIcon } from '@/libs/render';
import { NMenu, NIcon, NPopover, NButton } from 'naive-ui';
import { Archive, CollapseCategories, Home, InformationSquare, Menu as VerticalMenu, TagGroup } from '@vicons/carbon';
import flagStore from '@/stores/flag';

const flag = flagStore();

const menuOptions = [
  {
    label: getDestRoute('/', 'Home'),
    key: 'home',
    icon: getNIcon(Home)
  },
  {
    label: getDestRoute('/blogs/' + 1, 'Blogs'),
    key: 'blogs',
    icon: getNIcon(InformationSquare)
  },
  {
    label: getDestRoute('/category', 'Categories'),
    key: 'category',
    icon: getNIcon(CollapseCategories)
  },
  {
    label: getDestRoute('/tag', 'Tags'),
    key: 'tag',
    icon: getNIcon(TagGroup)
  },
  {
    label: getDestRoute('/archive', 'Archives'),
    key: 'archive',
    icon: getNIcon(Archive)
  }
];
</script>

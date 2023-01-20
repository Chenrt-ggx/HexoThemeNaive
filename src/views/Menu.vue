<template>
  <n-space align="center" justify="space-around" style="padding: 3px 0 3px">
    <n-menu :options="menuOptions" :value="$route.path" mode="horizontal" style="margin-top: 3px" />
    <n-space align="center">
      <n-switch :round="false" style="margin-right: 7px">
        <template #checked-icon>
          <n-icon :component="Stop" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Music" />
        </template>
      </n-switch>
      <n-switch :round="false" :rail-style="railStyle">
        <template #checked-icon>
          <n-icon :component="Moon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Sun" />
        </template>
      </n-switch>
      <n-divider vertical />
      <n-avatar circle style="margin: 6px 20px 6px 0; float: left" />
    </n-space>
  </n-space>
  <n-divider style="margin: 0" />
  <router-view />
</template>

<script setup>
import { NMenu, NDivider, NAvatar, NSwitch, NSpace, NIcon } from 'naive-ui';
import { getNIcon, getNamedRoute } from '@/libs/menu';
import { Home, CollapseCategories, TagGroup, Archive, InformationSquare } from '@vicons/carbon';
import { Sun, Moon, Music, Stop } from '@vicons/carbon';

const menuOptions = [
  {
    label: getNamedRoute('/', 'Home'),
    key: '/',
    icon: getNIcon(Home)
  },
  {
    label: getNamedRoute('/category', 'Categories'),
    key: '/category',
    icon: getNIcon(CollapseCategories)
  },
  {
    label: getNamedRoute('/tag', 'Tags'),
    key: '/tag',
    icon: getNIcon(TagGroup)
  },
  {
    label: getNamedRoute('/archive', 'Archives'),
    key: '/archive',
    icon: getNIcon(Archive)
  },
  {
    label: getNamedRoute('/about', 'About'),
    key: '/about',
    icon: getNIcon(InformationSquare)
  }
];

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = '#030852';
    if (focused) {
      style.boxShadow = '0 0 0 2px #03085240';
    }
  } else {
    style.background = '#fffb8f';
    if (focused) {
      style.boxShadow = '0 0 0 2px #fffb8f40';
    }
  }
  return style;
};
</script>

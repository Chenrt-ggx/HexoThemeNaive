<template>
  <n-space align="center" justify="space-around" style="padding: 3px 0 3px">
    <n-popover trigger="click" v-if="flag.mobile">
      <template #trigger>
        <n-button style="font-size: 24px">
          <n-icon>
            <vertical-menu />
          </n-icon>
        </n-button>
      </template>
      <n-menu :options="menuOptions" :value="$route.path" style="width: 60vw" />
    </n-popover>
    <n-menu v-else :options="menuOptions" :value="$route.path" mode="horizontal" style="margin-top: 3px" />
    <n-space align="center">
      <n-switch :round="false" style="margin-right: 7px">
        <template #checked-icon>
          <n-icon :component="Stop" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Music" />
        </template>
      </n-switch>
      <n-switch v-model:value="config.dark" :round="false" :rail-style="railStyle">
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
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';
import { getNIcon, getNamedRoute } from '@/libs/menu';
import { NMenu, NDivider, NAvatar, NSwitch, NSpace, NIcon, NPopover, NButton } from 'naive-ui';
import { Sun, Moon, Music, Stop, Menu as VerticalMenu } from '@vicons/carbon';
import { Home, CollapseCategories, TagGroup, Archive, InformationSquare } from '@vicons/carbon';

const config = configStore();
const flag = flagStore();

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

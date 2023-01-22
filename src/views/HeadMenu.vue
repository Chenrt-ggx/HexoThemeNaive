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
      <n-switch :value="switchMode" @update:value="handleSwitch" style="margin-right: 7px" v-if="config.bgm">
        <template #checked-icon>
          <play-spin />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Music" />
        </template>
      </n-switch>
      <n-switch v-model:value="mode.dark" :rail-style="railStyle">
        <template #checked-icon>
          <n-icon :component="Moon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="Sun" />
        </template>
      </n-switch>
      <n-divider vertical />
      <n-avatar circle style="margin: 6px 20px 6px 0; float: left; background-color: #00000000" :src="config.avatar" />
    </n-space>
  </n-space>
  <audio :src="config.bgm" ref="player" loop v-if="config.bgm" />
  <n-divider style="margin: 0" />
</template>

<script setup>
import { ref } from 'vue';
import { getNIcon, getNamedRoute } from '@/libs/render';
import { NMenu, NDivider, NAvatar, NSwitch, NSpace, NIcon, NPopover, NButton } from 'naive-ui';
import { Sun, Moon, Music, Menu as VerticalMenu } from '@vicons/carbon';
import { Home, CollapseCategories, TagGroup, Archive, InformationSquare } from '@vicons/carbon';
import flagStore from '@/stores/flag';
import modeStore from '@/stores/mode';
import configStore from '@/stores/config';
import PlaySpin from '@/components/PlaySpin';

const flag = flagStore();
const mode = modeStore();
const config = configStore();

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

const player = ref(null);
const switchMode = ref(false);
const handleSwitch = (value) => {
  player.value[value ? 'play' : 'pause']();
  switchMode.value = value;
};

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = '#061178';
    if (focused) {
      style.boxShadow = '0 0 0 2px #06117840';
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

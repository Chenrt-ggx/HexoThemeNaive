<template>
  <n-space align="center">
    <n-switch :value="playerMode" @update:value="handlePlayer" style="margin-right: 7px" v-if="config.bgm">
      <template #checked-icon>
        <play-spin />
      </template>
      <template #unchecked-icon>
        <n-icon :component="Music" />
      </template>
    </n-switch>
    <n-switch :value="mode.dark" @update:value="handleMode" :rail-style="railStyle">
      <template #checked-icon>
        <n-icon :component="Moon" />
      </template>
      <template #unchecked-icon>
        <n-icon :component="Sun" />
      </template>
    </n-switch>
    <n-divider vertical />
    <n-avatar
      circle
      :src="config.avatar"
      style="margin: 6px 20px 6px 0; float: left; background-color: #00000000"
      @click="handleClick"
    />
  </n-space>
  <n-modal :show="config.egg != null && showEgg" @update:show="handleEgg">
    <div class="egg-container">
      <img :src="config.egg" alt="orz" style="width: 280px" />
      <div>这都被发现了，您！</div>
    </div>
  </n-modal>
  <audio :src="config.bgm" ref="player" loop v-if="config.bgm" />
</template>

<script setup>
import { ref } from 'vue';
import { Sun, Moon, Music } from '@vicons/carbon';
import { NDivider, NAvatar, NSwitch, NSpace, NModal, NIcon } from 'naive-ui';
import modeStore from '@/stores/mode';
import configStore from '@/stores/config';
import PlaySpin from '@/components/PlaySpin';

const mode = modeStore();
const config = configStore();

const player = ref(null);
const playerMode = ref(false);
const handlePlayer = (value) => {
  player.value[value ? 'play' : 'pause']();
  playerMode.value = value;
};

const handleMode = (value) => {
  mode.dark = value;
  location.reload();
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

const showEgg = ref(false);
const handleEgg = (value) => (showEgg.value = value);
let count = 0;
const handleClick = () => {
  if (++count === 21) {
    showEgg.value = true;
    count = 0;
  }
};
</script>

<style scoped lang="scss">
.egg-container {
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  color: var(--n-text-color);
  background-color: var(--n-color);
  box-shadow: 0 0 10px #7f7f7f;
}
</style>

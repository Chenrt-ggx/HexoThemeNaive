<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-space align="center">
        <n-space vertical align="center" size="large">
          <img :src="config.avatar" alt="avatar" class="about-avatar" />
          <n-divider style="width: 70vw; max-width: 240px; margin: 20px 0 10px 0" />
          <n-text style="font-size: 40px" class="main-title">{{ config.author }}</n-text>
          <n-text style="font-size: 16px" depth="3" v-if="about">{{ about.email }}</n-text>
          <n-spin v-else />
        </n-space>
        <n-divider vertical style="min-height: 70vh; margin: 0 28px 0 28px" v-if="!flag.mobile" />
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAbout } from '@/api/common';
import { NText, NSpin, NSpace, NDivider, NGrid, NGridItem } from 'naive-ui';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';

const flag = flagStore();
const config = configStore();
document.title = [config.title, 'About'].join(' - ');

const about = ref();
onMounted(async () => {
  about.value = await getAbout();
});
</script>

<style scoped lang="scss">
.about-avatar {
  width: 70vw;
  max-width: 240px;
  border-radius: 24px;
  box-shadow: 0 0 12px #7f7f7f;
}
</style>

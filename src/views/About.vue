<template>
  <n-grid cols="32" item-responsive style="margin-top: 50px; margin-bottom: -15px; text-align: left">
    <n-grid-item span="0 800:7 1080:5" offset="16 800:3 1080:5">
      <n-space vertical align="center" size="large" style="margin-top: 20px; position: sticky; top: 70px">
        <img :src="config.avatar" alt="avatar" class="about-avatar" style="width: 100%" />
        <n-divider style="width: 160px; margin: 20px 0 10px 0" />
        <n-text style="font-size: 40px" class="main-title">{{ config.author }}</n-text>
        <n-text style="font-size: 16px" depth="3" v-if="about">{{ about.email }}</n-text>
        <n-spin v-else />
      </n-space>
    </n-grid-item>
    <n-grid-item span="27 800:17 1080:15" offset="3 800:2 1080:2">
      <n-h2 prefix="bar" align-text>About Me</n-h2>
      <n-ul v-if="about">
        <n-li v-for="(i, index) in about.introductions" :key="index" style="font-size: 16px">{{ i }}</n-li>
      </n-ul>
      <n-spin v-else />
      <n-h2 prefix="bar" align-text>My Repos</n-h2>
      <n-space v-if="about" vertical>
        <repo-link v-for="(i, index) in about.repos" :key="index" :info="i" />
      </n-space>
      <n-spin v-else />
      <n-h2 prefix="bar" align-text>My Friends</n-h2>
      <n-space v-if="about" :size="[10, 10]">
        <friend-link v-for="(i, index) in about.friends" :key="index" :info="i" />
      </n-space>
      <n-spin v-else />
      <n-h2 prefix="bar" align-text>Client Info</n-h2>
      <n-ul>
        <n-li style="font-size: 16px">浏览器：{{ userAgent.browser.name + ' ' + userAgent.browser.version }}</n-li>
        <n-li style="font-size: 16px">操作系统：{{ userAgent.os.name + ' ' + userAgent.os.version }}</n-li>
        <n-li style="font-size: 16px">于 {{ dateTime }} 渲染</n-li>
      </n-ul>
      <div v-if="flag.mobile" style="margin-left: -3.2%">
        <n-divider style="margin-bottom: 32px" />
        <n-space vertical align="center">
          <img :src="config.avatar" alt="avatar" class="about-avatar" style="width: 70%; margin-left: 15%" />
          <n-text style="font-size: 40px" class="main-title">{{ config.author }}</n-text>
          <n-text style="font-size: 16px" depth="3" v-if="about">{{ about.email }}</n-text>
          <n-spin v-else />
        </n-space>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAbout } from '@/api/common';
import { NH2, NLi, NUl, NText, NSpin, NSpace, NDivider, NGrid, NGridItem } from 'naive-ui';
import moment from 'moment/moment';
import UAParser from 'ua-parser-js';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';
import RepoLink from '@/components/RepoLink';
import FriendLink from '@/components/FriendLink';

const flag = flagStore();
const config = configStore();
document.title = [config.title, 'About'].join(' - ');

const parser = new UAParser();
const userAgent = parser.getResult();
const dateTime = moment().format('YYYY/MM/DD HH:mm:ss');

const about = ref();
onMounted(async () => {
  about.value = await getAbout();
});
</script>

<style scoped lang="scss">
.about-avatar {
  border-radius: 24px;
  box-shadow: 0 0 12px #7f7f7f;
}
</style>

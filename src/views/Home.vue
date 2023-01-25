<template>
  <div class="banner">
    <n-text style="display: block; font-size: 70px" class="naive-title">
      {{ config.title || 'Loading...' }}
    </n-text>
    <n-text style="font-size: 16px">
      {{ config.subtitle || 'Loading...' }}
    </n-text>
    <n-space :justify="flag.mobile ? 'left' : 'center'" style="margin-top: 18px">
      <n-button style="width: 100px" type="default" size="large" @click="handleGithub">
        <n-icon :component="LogoGithub" style="margin-right: 8px" />
        <span style="margin-top: 2px">Github</span>
      </n-button>
      <n-button :ghost="mode.dark" style="width: 100px" type="primary" size="large" @click="handleScroll">
        Let's Go !
      </n-button>
    </n-space>
    <img :src="require('@/assets/left.svg')" alt="left" class="left-image" />
    <img :src="require('@/assets/right.svg')" alt="right" class="right-image" v-if="!flag.mobile" />
  </div>
  <div ref="mark" />
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-space v-if="selected" vertical :size="30" style="margin-bottom: -20px">
        <simple-blog v-for="(i, index) in selected" :key="index" :blog="i" />
        <n-space justify="center" :style="{ marginTop: flag.mobile ? '-6px' : '12px' }">
          <router-link :to="{ name: 'blogs', params: { id: 1 } }" style="text-decoration: none">
            <n-button quaternary round type="success" size="large">Read More</n-button>
          </router-link>
        </n-space>
      </n-space>
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
import { getLatest } from '@/api/blog';
import { useRouter } from 'vue-router';
import { LogoGithub } from '@vicons/carbon';
import { NButton, NIcon, NSpin, NText, NSpace, NGrid, NGridItem } from 'naive-ui';
import modeStore from '@/stores/mode';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';
import SimpleBlog from '@/components/Blog/SimpleBlog';

const flag = flagStore();
const mode = modeStore();
const config = configStore();
const router = useRouter();

const selected = ref();
onMounted(async () => {
  const result = await getLatest();
  if (Object.keys(result).length === 0) {
    await router.push('/error');
  } else {
    selected.value = result;
  }
});

const mark = ref();
const handleScroll = () => window.$scrollTo({ top: mark.value.offsetTop - 20, behavior: 'smooth' });
const handleGithub = () => config.github && window.open(config.github);
</script>

<style scoped lang="scss">
.banner {
  display: flex;
  position: relative;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 56px);
}

.banner::after {
  content: '';
  width: 100%;
  height: 56px;
}

.naive-title {
  line-height: 1;
  margin-bottom: 24px;
}

.left-image {
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
}

.right-image {
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
}

@media only screen and (max-width: 1920px) {
  .left-image {
    min-width: 440px;
    right: calc(50% + 270px);
    width: calc(50% - 270px);
  }

  .right-image {
    min-width: 440px;
    left: calc(50% + 270px);
    width: calc(50% - 270px);
  }
}

@media only screen and (min-width: 1920px) {
  .left-image {
    left: 0;
    width: 700px;
  }

  .right-image {
    right: 0;
    width: 700px;
  }
}

@media only screen and (max-width: 800px) {
  .banner {
    transform: none;
    position: static;
    text-align: left;
    min-height: 550px;
    padding-top: 60px;
    padding-left: 16px;
    padding-right: 16px;
    height: calc(100vh - 124px);
  }

  .left-image {
    top: 8px;
    left: -16px;
    width: 300px;
    min-width: unset;
    transform: none;
    position: relative;
  }
}
</style>

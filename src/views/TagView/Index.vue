<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <template v-if="content">
        <n-space size="large" style="margin: 15px 0 40px">
          <span v-for="(i, index) in content.tags" :key="index">
            <router-link :to="{ name: 'tag-select', params: { id: [i.name, 1] } }" style="text-decoration: none">
              <n-tag type="info">
                <n-space justify="space-around" align="center" style="padding-left: 3px; padding-right: 4px">
                  <n-icon :size="20" :component="Tag" style="margin-top: 2px" />
                  <span>{{ i.name }}</span>
                  <n-badge :value="i.keys.length" type="info" />
                </n-space>
              </n-tag>
            </router-link>
          </span>
        </n-space>
        <n-divider />
        <n-timeline style="text-align: left; margin-top: 35px" size="large">
          <n-timeline-item v-for="(i, iIndex) in content.tags" :key="iIndex" type="info">
            <template #header>
              <router-link :to="{ name: 'tag-select', params: { id: [i.name, 1] } }">
                <n-h2 style="margin-bottom: 0">
                  <n-space align="center" style="margin-left: 2px">
                    <n-icon :component="Tag" style="display: inline-block" />
                    <span style="display: inline-block; margin-bottom: 6px">{{ i.name }}</span>
                  </n-space>
                </n-h2>
              </router-link>
            </template>
            <n-space vertical v-if="i.keys.length" size="large">
              <tiny-blog v-for="(j, jIndex) in i.keys" :key="jIndex" :blog="content.posts[j]" />
            </n-space>
          </n-timeline-item>
        </n-timeline>
      </template>
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
import { Tag } from '@vicons/carbon';
import { getTag } from '@/api/select';
import { NGrid, NGridItem, NTimeline, NTimelineItem } from 'naive-ui';
import { NH2, NSpin, NText, NBadge, NDivider, NTag, NIcon, NSpace } from 'naive-ui';
import TinyBlog from '@/components/Blog/TinyBlog';

const content = ref();
onMounted(async () => {
  content.value = await getTag();
});
</script>

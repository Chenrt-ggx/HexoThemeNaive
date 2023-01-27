<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-timeline style="text-align: left; margin-top: 20px; margin-bottom: -20px" v-if="content" size="large">
        <n-timeline-item v-for="(i, iIndex) in content.dates" :key="iIndex" type="info">
          <template #header>
            <n-text style="font-size: 22px">
              <n-space align="center" style="margin-left: 2px">
                <n-icon :component="Time" />
                <span style="display: inline-block; margin-bottom: 6px">{{ i.id }}</span>
                <n-icon :component="ChevronRight" />
                <n-badge :value="i.items.length" type="info" style="margin-bottom: 8px" />
              </n-space>
            </n-text>
          </template>
          <n-timeline style="margin-top: 25px" v-if="i.items.length" size="large">
            <n-timeline-item v-for="(j, jIndex) in i.items" :key="jIndex" type="info">
              <template #header>
                <router-link
                  :to="{ name: 'archive-select', params: { id: [i.id, j.id, 1] } }"
                  style="text-decoration: none"
                >
                  <n-breadcrumb style="margin-top: -6px">
                    <n-breadcrumb-item style="font-size: 20px; font-weight: 400">{{ i.id }}</n-breadcrumb-item>
                    <n-breadcrumb-item style="font-size: 20px; font-weight: 400">{{ j.id }}</n-breadcrumb-item>
                  </n-breadcrumb>
                </router-link>
              </template>
              <n-card size="small" content-style="padding: 3px 0 4px 0">
                <n-space vertical v-if="j.keys.length" size="large">
                  <div v-for="(k, kIndex) in j.keys" :key="kIndex">
                    <n-divider v-if="kIndex > 0" style="margin-top: -8px; margin-bottom: 3px" />
                    <tiny-blog
                      :blog="content.posts[k]"
                      :style="{ width: flag.mobile ? 'calc(100% - 12px)' : 'calc(100% - 2px)' }"
                    />
                  </div>
                </n-space>
              </n-card>
            </n-timeline-item>
          </n-timeline>
        </n-timeline-item>
        <n-timeline-item>
          <n-text style="font-size: 22px" depth="3">
            <n-space align="center" style="margin-left: 2px">
              <n-icon :component="FolderAdd" />
              <span style="display: inline-block; margin-bottom: 5px">Dream starts from here</span>
            </n-space>
          </n-text>
        </n-timeline-item>
      </n-timeline>
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
import { getArchive } from '@/api/select';
import { Time, FolderAdd, ChevronRight } from '@vicons/carbon';
import { NCard, NSpin, NDivider, NText, NIcon, NBadge, NSpace } from 'naive-ui';
import { NGrid, NGridItem, NTimeline, NTimelineItem, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import flagStore from '@/stores/flag';
import configStore from '@/stores/config';
import TinyBlog from '@/components/Blog/TinyBlog';

const content = ref();
onMounted(async () => {
  content.value = await getArchive();
});

const flag = flagStore();
const config = configStore();
document.title = [config.title, 'Archives'].join(' - ');
</script>

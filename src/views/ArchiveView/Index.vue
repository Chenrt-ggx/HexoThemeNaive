<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-timeline style="text-align: left; margin-top: 20px; margin-bottom: -10px" v-if="content" size="large">
        <n-timeline-item v-for="(i, iIndex) in content.dates" :key="iIndex" type="info">
          <template #header>
            <n-h2 style="margin-bottom: 0">
              <n-space align="center" style="margin-left: 2px">
                <n-icon :component="Time" style="display: inline-block" />
                <span style="display: inline-block; margin-bottom: 6px">{{ i.id }}</span>
                <n-icon :component="ChevronRight" style="display: inline-block" />
                <n-badge :value="i.items.length" type="info" style="margin-bottom: 8px" />
              </n-space>
            </n-h2>
          </template>
          <n-timeline style="text-align: left; margin-top: 25px" v-if="i.items.length" size="large">
            <n-timeline-item v-for="(j, jIndex) in i.items" :key="jIndex" type="info">
              <template #header>
                <router-link
                  :to="{ name: 'archive-select', params: { id: [i.id, j.id, 1] } }"
                  style="text-decoration: none"
                >
                  <n-breadcrumb style="margin-top: -6px">
                    <n-breadcrumb-item style="font-size: 20px">{{ i.id }}</n-breadcrumb-item>
                    <n-breadcrumb-item style="font-size: 20px">{{ j.id }}</n-breadcrumb-item>
                  </n-breadcrumb>
                </router-link>
              </template>
              <n-card size="small" :content-style="{ padding: flag.mobile ? '4px 10px 4px 0' : '4px 0 4px 0' }">
                <n-space vertical v-if="j.keys.length" size="large">
                  <div v-for="(k, kIndex) in j.keys" :key="kIndex">
                    <n-divider v-if="kIndex > 0" style="margin-top: -8px; margin-bottom: 5px" />
                    <tiny-blog :blog="content.posts[k]" />
                  </div>
                </n-space>
              </n-card>
            </n-timeline-item>
          </n-timeline>
        </n-timeline-item>
        <n-timeline-item>
          <n-h2 style="margin-bottom: 0">
            <n-space align="center" style="margin-left: 2px; color: #7f7f7f">
              <n-icon :component="FolderAdd" style="display: inline-block" />
              <span style="display: inline-block; margin-bottom: 6px">Dream starts from here</span>
            </n-space>
          </n-h2>
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
import { NH2, NCard, NSpin, NDivider, NText, NIcon, NBadge, NSpace } from 'naive-ui';
import { NGrid, NGridItem, NTimeline, NTimelineItem, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import flagStore from '@/stores/flag';
import TinyBlog from '@/components/Blog/TinyBlog';

const content = ref();
onMounted(async () => {
  content.value = await getArchive();
});

const flag = flagStore();
</script>

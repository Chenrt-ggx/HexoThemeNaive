<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-timeline style="text-align: left; margin-top: 25px" v-if="content" size="large">
        <n-timeline-item v-for="(i, iIndex) in content.dates" :key="iIndex" type="info">
          <template #header>
            <n-h2 style="margin-bottom: 0">
              <n-space align="center" style="margin-left: 2px">
                <n-icon :component="Time" style="display: inline-block" />
                <span style="display: inline-block; margin-bottom: 6px">
                  {{ i.id + ' (' + i.items.length + ')' }}
                </span>
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
                    <n-breadcrumb-item style="font-size: 22px">{{ i.id }}</n-breadcrumb-item>
                    <n-breadcrumb-item style="font-size: 22px">{{ j.id }}</n-breadcrumb-item>
                  </n-breadcrumb>
                </router-link>
              </template>
              <n-space vertical v-if="j.keys.length" size="large">
                <tiny-blog v-for="(k, kIndex) in j.keys" :key="kIndex" :blog="content.posts[k]" />
              </n-space>
            </n-timeline-item>
          </n-timeline>
        </n-timeline-item>
        <n-timeline-item>
          <n-h2 style="margin-bottom: 0">
            <n-space align="center" style="margin-left: 2px">
              <n-icon :component="FolderAdd" style="display: inline-block" />
              <span style="display: inline-block; margin-bottom: 6px">The place where dreams begin</span>
            </n-space>
          </n-h2>
        </n-timeline-item>
      </n-timeline>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getArchive } from '@/api/select';
import { Time, FolderAdd } from '@vicons/carbon';
import { NH2, NIcon, NSpace, NGrid, NGridItem, NTimeline, NTimelineItem, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import TinyBlog from '@/components/Blog/TinyBlog';

const content = ref();
onMounted(async () => {
  content.value = await getArchive();
});
</script>

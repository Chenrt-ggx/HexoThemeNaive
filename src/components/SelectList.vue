<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-space v-if="selected" vertical :size="30">
        <n-breadcrumb>
          <n-breadcrumb-item v-if="props.name && showShorter">
            <span style="font-size: 18px">{{ props.name }}</span>
          </n-breadcrumb-item>
          <n-breadcrumb-item v-for="(i, index) in breadcrumb" :key="index">
            <span style="font-size: 18px">{{ i }}</span>
          </n-breadcrumb-item>
        </n-breadcrumb>
        <simple-blog v-for="(i, index) in selected.content" :key="index" :blog="i" />
        <n-space justify="center" :style="flag.mobile ? {} : { marginTop: '20px' }">
          <n-pagination
            :page="selected.page.current"
            :page-count="selected.page.total"
            :page-slot="7"
            @update:page="handleUpdate"
            style="margin-bottom: -10px"
          />
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
import { ref, computed, onMounted, defineProps } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { NSpin, NText, NSpace, NGrid, NGridItem, NPagination, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import flagStore from '@/stores/flag';
import SimpleBlog from '@/components/Blog/SimpleBlog';

const props = defineProps({
  api: {
    type: Function,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  }
});

const selected = ref();
const refreshItemList = async (to, from) => {
  const result = await props.api(from || to ? to.params.id : route.params.id);
  if (Object.keys(result).length === 0) {
    await router.push('/error');
  } else {
    selected.value = result;
  }
};

const route = useRoute();
const router = useRouter();
onMounted(refreshItemList);
onBeforeRouteUpdate(refreshItemList);
const handleUpdate = async (value) => {
  const id = route.params.id;
  const dest = typeof id === 'string' ? value : [...id.slice(0, id.length - 1), value];
  window.$scrollTo({ top: 0, behavior: 'smooth' });
  await router.push({ name: props.route, params: { id: dest } });
};

const flag = flagStore();
const showShorter = computed(() => !(flag.mobile && props.name.length >= 8 && route.params.id.length >= 4));
const breadcrumb = computed(() => {
  const id = route.params.id;
  return id.slice(0, id.length - 1);
});
</script>

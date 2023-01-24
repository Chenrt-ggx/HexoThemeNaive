<template>
  <n-grid cols="32" item-responsive style="margin-top: 30px; text-align: left">
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <slot />
      <n-space v-if="selected" vertical :size="32">
        <simple-blog v-for="(i, index) in selected.content" :key="index" :blog="i" />
        <n-space justify="center">
          <n-pagination :page="selected.page.current" :page-count="selected.page.total" @update:page="handleUpdate" />
        </n-space>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, defineProps } from 'vue';
import { NSpace, NGrid, NGridItem, NPagination } from 'naive-ui';
import SimpleBlog from '@/components/Blog/SimpleBlog';

const props = defineProps({
  api: {
    type: Function,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

const route = useRoute();
const router = useRouter();

const refresh = async () => {
  const result = await props.api(route.params.id);
  if (Object.keys(result).length === 0) {
    await router.push('/error');
  } else {
    selected.value = result;
  }
};

const selected = ref();
onMounted(refresh);
const handleUpdate = async (value) => {
  const id = route.params.id;
  const dest = [...id.slice(0, id.length - 1), value];
  await router.push({ name: props.route, params: { id: dest } });
  await refresh();
  window.$scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

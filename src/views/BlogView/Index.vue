<template>
  <full-blog :blog="post" />
</template>

<script setup>
import { getPost } from '@/api/blog';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import configStore from '@/stores/config';
import FullBlog from '@/components/Blog/FullBlog';

const route = useRoute();
const router = useRouter();
const config = configStore();
document.title = [config.title, 'Loading...'].join(' - ');

const post = ref();
onMounted(async () => {
  const result = await getPost(route.params.id);
  if (Object.keys(result).length === 0) {
    await router.push('/error');
  } else {
    post.value = result;
    document.title = [config.title, result.title].join(' - ');
  }
});
</script>

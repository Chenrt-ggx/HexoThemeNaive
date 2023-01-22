<template>
  <full-blog :blog="post" />
</template>

<script setup>
import { getPost } from '@/api/blog';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FullBlog from '@/components/Blog/FullBlog';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const post = ref();
onMounted(async () => {
  const result = await getPost(id);
  if (Object.keys(result).length === 0) {
    await router.push('/error');
  } else {
    post.value = result;
  }
});
</script>

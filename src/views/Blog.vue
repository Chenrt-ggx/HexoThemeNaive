<template>
  <full-blog :blog="post" />
</template>

<script setup>
import { getPost } from '@/api/blog';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FullBlog from '@/components/Blog/FullBlog';

const route = useRoute();
const id = route.params.id;

const post = ref();
onMounted(async () => {
  post.value = await getPost(id);
});
</script>

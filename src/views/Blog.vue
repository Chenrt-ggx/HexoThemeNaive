<template>
  <n-grid cols="32" item-responsive>
    <n-grid-item span="28 800:24 1080:20" offset="2 800:4 1080:6">
      <n-space vertical style="margin-top: 30px" size="large">
        <n-card>
          <full-blog :blog="post" />
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { getPost } from '@/api/blog';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NCard, NSpace, NGrid, NGridItem } from 'naive-ui';
import FullBlog from '@/components/Blog/FullBlog';

const route = useRoute();
const id = route.params.id;

const post = ref();
onMounted(async () => {
  post.value = await getPost(id);
});
</script>

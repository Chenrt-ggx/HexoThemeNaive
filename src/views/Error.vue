<template>
  <div class="page-container">
    <div class="text-center">
      <img src="@/assets/404.svg" alt="404" />
    </div>
    <div class="text-center">
      <h1>抱歉，你访问的页面不存在</h1>
      <router-link to="/" style="text-decoration: none">
        <n-button type="info" @click="$router.push('/')">Back To Home</n-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui';
import configStore from '@/stores/config';

const config = configStore();
document.title = [config.title, 'Error'].join(' - ');
</script>

<style scoped lang="scss">
.page-container {
  padding: 14vh 0;

  .text-center {
    h1 {
      color: #666;
      padding: 20px 0;
    }
  }

  img {
    width: 80%;
    max-width: 400px;
  }
}
</style>

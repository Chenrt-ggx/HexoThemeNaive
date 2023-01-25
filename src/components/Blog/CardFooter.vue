<template>
  <n-divider style="margin-top: 0" />
  <n-space justify="space-between" align="center" :style="flag.mobile ? { marginTop: '-6px' } : {}">
    <n-button ghost v-if="props.button && !flag.mobile" @click="$router.push(link)">
      <n-icon :component="View" />
      <router-link :to="link" class="link-fix" style="margin-left: 10px">阅读全文</router-link>
    </n-button>
    <span v-else />
    <div style="color: #7f7f7f; text-align: right; text-decoration: none">
      <div>{{ length + ', ' + time }}</div>
      <div v-if="flag.mobile">
        <router-link :to="{ name: 'archive-select', params: { id: createdRoute } }" class="date-link-fix">
          {{ createdStr }}
        </router-link>
      </div>
      <div v-if="flag.mobile">
        <router-link :to="{ name: 'archive-select', params: { id: updatedRoute } }" class="date-link-fix">
          {{ updatedStr }}
        </router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'archive-select', params: { id: createdRoute } }" class="date-link-fix">
          {{ createdStr }}
        </router-link>
        <span>, </span>
        <router-link :to="{ name: 'archive-select', params: { id: updatedRoute } }" class="date-link-fix">
          {{ updatedStr }}
        </router-link>
      </div>
    </div>
  </n-space>
</template>

<script setup>
import { View } from '@vicons/carbon';
import { computed, defineProps } from 'vue';
import { NIcon, NSpace, NDivider, NButton } from 'naive-ui';
import moment from 'moment/moment';
import flagStore from '@/stores/flag';

const props = defineProps({
  blog: {
    type: Object,
    required: true
  },
  link: {
    type: Object,
    required: true
  },
  button: {
    type: Boolean,
    default: false
  }
});

const flag = flagStore();
const length = computed(() => 'Word count: ' + props.blog.length);
const time = computed(() => 'Reading time: ' + props.blog.time + ' min');

const format = 'YYYY-MM-DD HH:mm:ss';
const createdMoment = computed(() => moment(props.blog.created));
const updatedMoment = computed(() => moment(props.blog.updated));
const createdRoute = computed(() => [createdMoment.value.format('YYYY'), createdMoment.value.format('MM'), 1]);
const updatedRoute = computed(() => [updatedMoment.value.format('YYYY'), updatedMoment.value.format('MM'), 1]);
const createdStr = computed(() => 'Created: ' + createdMoment.value.format(format));
const updatedStr = computed(() => 'Last modified: ' + updatedMoment.value.format(format));
</script>

<style scoped lang="scss" src="./common.scss" />

import { defineStore } from 'pinia';

export default defineStore('config', {
  state: () => ({
    avatar: require('@/assets/user.svg'),
    bgm: null,
    egg: null
  })
});

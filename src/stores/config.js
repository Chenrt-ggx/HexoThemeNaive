import { defineStore } from 'pinia';

export default defineStore('config', {
  state: () => ({
    dark: false
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
});

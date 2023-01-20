import { defineStore } from 'pinia';

export default defineStore('mode', {
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

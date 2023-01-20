import { defineStore } from 'pinia';

export default defineStore('config', {
  state: () => ({
    theme: 'auto',
    range: { start: 7, end: 22 }
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

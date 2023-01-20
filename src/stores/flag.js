import { defineStore } from 'pinia';

export default defineStore('flag', {
  state: () => ({
    wide: document.body.clientWidth >= 1080,
    mobile: document.body.clientWidth <= 640
  })
});

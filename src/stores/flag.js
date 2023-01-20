import { defineStore } from 'pinia';

export default defineStore('flag', {
  state: () => ({
    mobile: false,
    narrow: false
  })
});

import { createApp } from 'vue';
import hljs from 'highlight.js';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    if (!block.getAttribute('hljsln')) {
      block.setAttribute('hljsln', 'true');
      hljs.highlightElement(block);
    }
  });
});

app.mount('#app');

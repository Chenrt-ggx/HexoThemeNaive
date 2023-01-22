import { createApp } from 'vue';
import hljs from 'highlight.js';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    if (!block.getAttribute('hljsln')) {
      block.setAttribute('hljsln', 'true');
      hljs.highlightElement(block);
    }
  });
});

app.directive('category', (el, binding) => {
  const titles = el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const selected = Array.from(titles).filter((i) => /href="(.+?)" class=".+?" title="(.+?)"/g.test(i.innerHTML));
  binding.value(
    selected.map((i) => {
      const [, link, name] = i.innerHTML.match(/href="(.+?)" class=".+?" title="(.+?)"/);
      return {
        level: parseInt(i.localName[i.localName.indexOf('h') + 1]),
        href: link,
        title: name
      };
    })
  );
});

app.mount('#app');

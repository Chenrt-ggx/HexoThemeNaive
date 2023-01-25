import { createApp } from 'vue';
import { lineNumbersBlock } from '@/libs/lineNumber';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    if (!block.getAttribute('hljsln')) {
      lineNumbersBlock(block);
      block.setAttribute('hljsln', 'true');
    }
  });
});

app.directive('category', (el, binding) => {
  const titles = el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const selected = Array.from(titles).filter((i) => /<a.+?href="(.+?)".*?><\/a>\s*(.+)$/g.test(i.innerHTML));
  const mapped = selected.map((i) => {
    const [, link, name] = i.innerHTML.match(/<a.+?href="(.+?)".*?><\/a>\s*(.+)$/);
    return { level: parseInt(i.localName[i.localName.indexOf('h') + 1]), href: link, title: name };
  });
  binding.value(mapped);
});

app.mount('#app');

import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

const getNamedRoute = (dest, name) => {
  return () => h(RouterLink, { to: dest }, { default: () => name });
};

const getNIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

export { getNIcon, getNamedRoute };

import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

const getNIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const getNamedRoute = (dest, name) => {
  return () => h(RouterLink, { to: dest }, { default: () => name });
};

export { getNIcon, getNamedRoute };

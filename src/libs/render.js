import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

const getNIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const getDestRoute = (dest, name) => {
  return () => h(RouterLink, { to: dest }, { default: () => name });
};

const getNameRoute = (params, name, title) => {
  const props = { to: { name: name, params: { id: params } } };
  return () => h(RouterLink, props, { default: () => title });
};

export { getNIcon, getDestRoute, getNameRoute };

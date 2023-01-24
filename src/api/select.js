import { getRequest } from '@/api/intercept';

export const getCategory = () => {
  return getRequest('/api/getCategories');
};

export const selectCategory = (routes) => {
  return getRequest('/api/getPostsByCategory/' + routes.join('/'));
};

export const getTag = () => {
  return getRequest('/api/getTags');
};

export const selectTag = (routes) => {
  return getRequest('/api/getPostsByTag/' + routes.join('/'));
};

export const getArchive = () => {
  return getRequest('/api/getDates');
};

export const selectArchive = (routes) => {
  return getRequest('/api/getPostsByDate/' + routes.join('/'));
};

import { getRequest } from '@/api/intercept';

export const selectCategory = (routes) => {
  return getRequest('/api/getPostsByCategory/' + routes.join('/'));
};

export const selectTag = (routes) => {
  return getRequest('/api/getPostsByTag/' + routes.join('/'));
};

export const selectArchive = (routes) => {
  return getRequest('/api/getPostsByDate/' + routes.join('/'));
};

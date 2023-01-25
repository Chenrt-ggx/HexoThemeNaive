import { getRequest } from '@/api/intercept';

export const getPost = (id) => {
  return getRequest('/api/getPostById/' + id);
};

export const getPosts = (id) => {
  return getRequest('/api/getPosts/' + id);
};

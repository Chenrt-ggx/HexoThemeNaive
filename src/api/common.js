import { getRequest } from '@/api/intercept';

export const getConfig = () => {
  return getRequest('api/getInfo');
};

export const getAbout = () => {
  return getRequest('api/getAbout');
};

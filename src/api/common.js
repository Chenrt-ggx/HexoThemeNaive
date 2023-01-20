import { getRequest } from '@/api/intercept';

export const getConfig = () => {
  return getRequest('/config.json');
};

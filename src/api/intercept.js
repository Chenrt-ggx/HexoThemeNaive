import axios from 'axios';

const getMessage = (data, name) => {
  if (name) {
    return data ? name + '错误: ' + data : '请求失败：未知的' + name + '错误';
  } else {
    return data ? '请求错误: ' + data : '请求失败：未知的错误';
  }
};

axios.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (400 <= error.response.status && error.response.status < 500) {
        switch (error.response.status) {
          case 401:
            return Promise.reject('请求失败：您没有要求的身份验证凭证');
          case 403:
            return Promise.reject('请求失败：您没有权限进行这个操作');
          case 404:
            return Promise.reject('请求失败：您所请求的资源无法找到');
          case 405:
            return Promise.reject('请求失败：您所请求的方法被禁止');
          default:
            return Promise.reject(getMessage(error.response.data, '客户端'));
        }
      } else if (error.response.status >= 500) {
        return Promise.reject(getMessage(error.response.data, '服务端'));
      } else {
        return Promise.reject(getMessage(error.response.data));
      }
    }
    return Promise.reject(getMessage(error));
  }
);

export async function getRequest(url, params = {}) {
  try {
    const response = await axios(url, { method: 'get', params: params });
    if (response.data.error) {
      window.$message.error(response.data.error, { duration: 5000 });
      return {};
    } else {
      return response.data;
    }
  } catch (error) {
    window.$message.error(error, { duration: 5000 });
    return {};
  }
}

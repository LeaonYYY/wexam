import { extend } from 'umi-request';

const request = extend({
  prefix: 'http://127.0.0.1:4523/mock/643242',
});
request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        token: localStorage.getItem('token') || '',
      },
    },
  };
});
export default request;

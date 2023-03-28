import { extend } from 'umi-request';

const request = extend({
  prefix:
    process.env.NODE_ENV === 'development'
      ? '/api'
      : 'http://8.141.56.170:9090',
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

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://8.141.56.170:9090/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  fastRefresh: {},
  publicPath: './',
  history: {
    type: 'hash',
  },
});

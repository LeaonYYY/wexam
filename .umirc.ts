import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  publicPath: './',
  history: {
    type: 'hash',
  },
});

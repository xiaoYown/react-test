import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/datasource-content',
      component: '@/pages/datasource-editor/example',
    },
  ],
  fastRefresh: {},
});

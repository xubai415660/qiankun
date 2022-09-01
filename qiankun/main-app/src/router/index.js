import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index.vue')
    },
    // 设置一个通配符的路由
    {
      path: '/*',
      component: () => import('@/views/index.vue')
    }
  ]
});

export default router;

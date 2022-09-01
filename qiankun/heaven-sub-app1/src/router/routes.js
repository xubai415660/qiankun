/*
 * @description:路由地址
 * @author: 王浩
 * @Date: 2022-09-01 10:06:41
 * @Modified By:
 * @version: 1.0.0
 */

const routes = [
  {
    path: '/',
    redirect: '/heaven-sub-app1'
  },
  {
    path: '/index',
    redirect: '/heaven-sub-app1'
  },
  {
    path: '/heaven-sub-app1',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: 'example-a',
        name: 'App1ExampleA'
      },
      {
        path: 'example-a/1',
        name: 'App1ExampleA1',
        component: () => import('@/views/example-a/example-a-1.vue')
      },
      {
        path: '404',
        name: 'NotFound',
        component: () => import('@/views/404.vue')
      }
    ]
  }
];

export default routes;

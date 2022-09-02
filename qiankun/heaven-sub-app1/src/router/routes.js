/*
 * @description:路由地址
 * @author: 王浩
 * @Date: 2022-09-01 10:06:41
 * @Modified By:
 * @version: 1.0.0
 */

const routes = [
    {
        path: '/micro-app',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: 'page1',
                name: 'Page1',
                component: () => import('@/views/micro-app/page1.vue')
            },
            {
                path: 'page2',
                name: 'Page2',
                component: () => import('@/views/micro-app/page2.vue')
            },
            {
                path: 'page3',
                name: 'Page3',
                component: () => import('@/views/micro-app/page3.vue')
            },
            {
                path: '404',
                name: '404',
                component: () => import('@/views/404/index.vue')
            }
        ]
    }
];

export default routes;

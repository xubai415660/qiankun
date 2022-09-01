const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/index',
        redirect: '/'
    },
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: '/',
                name: 'Welcome',
                component: () => import('@/views/welcome.vue')
            },
            {
                path: '/404',
                name: 'NotFound',
                component: () => import('@/views/404.vue')
            }
        ]
    },
    {
        path: '/*',
        component: () => import('@/views/index.vue')
    }
];

export default routes;

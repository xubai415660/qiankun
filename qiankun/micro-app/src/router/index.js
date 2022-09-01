/*
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 16:12:47
 * @Modified By:
 * @version: 1.0.0
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/micro-app',
      name: 'Index',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'page1',
          name: 'Page1',
          component: () => import('@/views/page1.vue')
        },
        {
          path: 'page2',
          name: 'Page2',
          component: () => import('@/views/page2.vue')
        }
      ]
    }
  ]
})

export default router

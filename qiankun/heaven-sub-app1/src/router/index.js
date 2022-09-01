/*
 * @description: 路由配置
 * @author: 王浩
 * @Date: 2022-09-01 10:03:40
 * @Modified By:
 * @version: 1.0.0
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(Router);

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push,
    originalReplace = Router.prototype.replace;
// push
Router.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch((err) => err);
};
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this, location, onResolve, onReject);
    }
    return originalReplace.call(this, location).catch((err) => err);
};

const router = new Router({
    mode: 'hash',
    routes
});

const beforeEach = function (to, from, next) {
    if (['Login'].includes(to.name)) {
        next();
    } else {
        if (store.state.common.token) {
            if (['Login', 'Index', 'Welcome', 'NotFound'].includes(to.name)) {
                next();
            } else {
                const allMenus = store.getters['common/getUserAllMicroAppMenus'];
                let hasPermission = allMenus.find((i) => i.resourceUrl === to.path);
                // 如果跳转的路由有权限那么添加到tabs列表里面
                if (hasPermission) {
                    next();
                    // eslint-disable-next-line max-depth
                    if (!hasPermission.resourceIsHidden){
                        store.dispatch('common/addCurrentTab', { ...hasPermission, query: to.query});
                    }
                } else {
                    next({ name: 'NotFound' });
                    // next()
                }
            }
        } else {
            next({ name: 'Login', replace: true });
        }
    }
};

router.beforeEach((to, from, next) => {
    beforeEach(to, from, next);
});

export default router;

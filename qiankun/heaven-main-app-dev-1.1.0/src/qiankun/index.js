import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
import Vue from 'vue';

const microHandler = {
    beforeLoad: [
        (app) => {
            console.log('%c before load', 'background:#3a5ab0 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 预加载
    beforeMount: [
        (app) => {
            console.log('%c before mount', 'background:#7d9553 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 挂载前回调
    afterMount: [
        (app) => {
            console.log('%c after mount', 'background:#7d7453 ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ], // 挂载后回调
    beforeUnmount: [
        (app) => {
            console.log(
                '%c before unmount',
                'background:#7dd253 ; padding: 1px; border-radius: 3px;  color: #fff',
                app
            );
        }
    ], // 卸载前回调
    afterUnmount: [
        (app) => {
            console.log('%c after unmount', 'background:#d2525c ; padding: 1px; border-radius: 3px;  color: #fff', app);
        }
    ] // 卸载后回调
};

addGlobalUncaughtErrorHandler((event) => {
    Vue.prototype.$loading({}).close();
    const { message } = event;
    if (message && message.includes('died in status')) {
        Vue.prototype.$loading({}).close();
        Vue.prototype.$notify({
            title: '微应用触发异常',
            message: event.message,
            type: 'error'
        });
    }

});

// 微应用注册并启动
export const registerApps = (apps) => {
    registerMicroApps(apps, microHandler);
    start({
        // 是否开启预加载
        prefetch: 'none'
    });
};

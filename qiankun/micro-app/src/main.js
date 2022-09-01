/*
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 16:12:47
 * @Modified By:
 * @version: 1.0.0
 */
import './qiankun/public-path'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import '@/utils/element.js'
import '@/common/style/base.css'
import '@/common/style/global.scss'

Vue.config.productionTip = false

let instance = null;
function render (props = {}) {
  const { container } = props;
  container &&
    container.setAttribute(
      'style',
      'height:100%;overflow-y: auto;background-color: #ffffff;'
    );
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
    // 为了避免根 id #app 与其他的 DOM 冲突，需要限制查找范围。
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 如果值为true代表处于乾坤环境，否则是独立运行。
if (!window.__POWERED_BY_QIANKUN__) {
  // 独立运行时，手动创建Vue实例
  render();
}

// bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
export async function bootstrap () {
  console.log('[vue] vue app bootstraped');
}

// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
export async function mount (props) {
  Vue.prototype.$setGlobalState = props.setGlobalState;
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  // 获取 qiankunEventBus
  Vue.prototype.$qiankunEventBus = props.qiankunEventBus;
  //将主应用的common注册的微应用自己的vueX实例上，这样子应用就可以使用自己的vueX实例访问该模块
  if (store && store.hasModule) {
    console.log('[vue] props from main framework', props);
    //判断是否存在该模块，如果不存在，则将该模块注册到vueX上
    if (!store.hasModule('qiankunCommonStore')) {
      //将该模块注册到vuex上
      store.registerModule('qiankunCommonStore', props.qiankunCommonStore)
    }
  }
  render(props);
}

// 应用每次 切出/卸载 会调用的unmount方法，通常在这里我们会卸载微应用的应用实例
export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

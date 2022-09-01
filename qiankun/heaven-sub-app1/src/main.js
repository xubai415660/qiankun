/*
 * @description: 配置文件
 * @author: 王浩
 * @Date: 2022-09-01 09:40:52
 * @Modified By:
 * @version: 1.0.0
 */
import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import echarts from 'echarts'
import './qiankun/public-path';

// 引入自定关样式
import '@/utils/element.js'
import '@/common/style/base.css'
import '@/common/style/global.scss'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

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
    // eslint-disable-next-line id-length
    render: (h) => h(App)
    // 为了避免根 id #app 与其他的 DOM 冲突，需要限制查找范围。
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped');
}

// 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
export async function mount (props) {
  console.log('[vue] props from main framework', props);
  Vue.prototype.$qiankunEventBus = props.qiankunEventBus;
  Vue.prototype.$qiankunStore = props.qiankunStore;
  Vue.prototype.$setGlobalState = props.setGlobalState;
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange;
  // 将基座的common注册的微应用自己的vuex实例上，这样微应用就可以使用自己的vuex实例访问该模块
  if (store && store.hasModule) {
    if (!store.hasModule('qiankunCommonStore')) {
      store.registerModule('qiankunCommonStore', props.qiankunCommonStore);
    }
  }
  store.dispatch('common/setIsPoweredByQiankun', true);
  render(props);
}

// 应用每次 切出/卸载 会调用的unmount方法，通常在这里我们会卸载微应用的应用实例
export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}

/*
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 16:32:56
 * @Modified By:
 * @version: 1.0.0
 */
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun'
import Vue from 'vue'

// 监听微应用的生命周期
const microHandler = {
  beforeLoad: [
    (app) => {
      console.log('%c before load', 'background:#3a5ab0 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 预加载
  beforeMount: [
    (app) => {
      console.log('%c before mount', 'background:#7d9553 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 挂载前回调
  afterMount: [
    (app) => {
      console.log('%c after mount', 'background:#7d7453 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 挂载后回调
  beforeUnmount: [
    (app) => {
      console.log('%c before unmount', 'background:#7dd253 ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ], // 卸载前回调
  afterUnmount: [
    (app) => {
      console.log('%c after unmount', 'background:#d2525c ; padding: 1px; border-radius: 3px;  color: #fff', app)
    }
  ] // 卸载后回调
}

// 添加全局的未捕获异常处理器。
addGlobalUncaughtErrorHandler((event) => {
  Vue.prototype.$loading({}).close()
  const { message } = event
  if (message && message.includes('died in status')) {
    Vue.prototype.$notify({
      title: '加载微应用失败',
      message: event.message,
      type: 'error'
    })
  }
})

export const registerApps = (apps) => {
  // 注册微应用
  registerMicroApps(apps, microHandler)
  // 启动微应用
  start({
    prefetch: 'none'
  })
}

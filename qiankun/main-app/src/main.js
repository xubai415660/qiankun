import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

import '@/utils/element.js'
import '@/common/style/base.css'
import '@/common/style/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import RemoteApp from "./RemoteApp";
import router from "./router";
import store from "./store";
import common from "qiankun-vue2-common";
import "qiankun-vue2-common/iconfont/iconfont.css";
import validator from "validator";

//注册全局组件
import plugins from "@/plugins";
Vue.use(plugins);

//注册全局配置
import website from "./config/website";
Vue.prototype.$website = website;

//注册指令
import importDirective from "@/directive";
importDirective(Vue);

Vue.config.productionTip = false;
console.log("版本信息:", process.env.version);

Vue.prototype.$validator = validator;

let instance = null;

function render(props = {}) {
  const { container, componentName, componentPath } = props;
  if (!componentName) {
    instance = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount(container ? container.querySelector("#app") : "#app");
  } else {
    instance = new Vue({
      store,
      render: (h) =>
        h(RemoteApp, {
          props: {
            componentName: componentName,
            componentPath: componentPath,
          },
        }),
    }).$mount(container ? container.querySelector("#app") : "#app");
  }
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  common.initGlobalState(store, props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}

/**
 * @description：全局注册组件文件
 * @author：
 * @date：Created in 2021/12/19 08:57
 * @modified By：
 * @version: 1.0.0
 */
import Tables from "@/components/Tables";

const plugins = {
  //注册
  install(Vue) {
    Vue.component("Tables", Tables); //第一个参数:组件名称,第二个参数:要注册的组件
  },
};

export default plugins;

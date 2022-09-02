/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import checkRole from "./checkRole";

const install = function (Vue) {
  Vue.directive("checkRole", checkRole);
};

if (window.Vue) {
  window["checkRole"] = checkRole;
  Vue.use(install); // eslint-disable-line
}

checkRole.install = install;
export default checkRole;

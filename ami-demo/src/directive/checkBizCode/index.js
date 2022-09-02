/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import checkBizCode from "./checkBizCode";

const install = function (Vue) {
  Vue.directive("checkBizCode", checkBizCode);
};

if (window.Vue) {
  window["checkBizCode"] = checkBizCode;
  Vue.use(install); // eslint-disable-line
}

checkBizCode.install = install;
export default checkBizCode;

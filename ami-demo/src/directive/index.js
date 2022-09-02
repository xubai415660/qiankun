/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import directive from "./directives";

const importDirective = (Vue) => {
  Vue.directive("checkBizCode", directive.checkBizCode);

  Vue.directive("checkRole", directive.checkRole);
  Vue.directive("validate", directive.validate);
};

export default importDirective;

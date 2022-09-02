/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import checkBizCode from "./checkBizCode/index";
import checkRole from "./checkRole/checkRole";
import validate from "./validate.js";

const directives = {
  checkBizCode,
  checkRole,
  validate,
};

export default directives;

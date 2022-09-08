/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { getStore } from "@/utils/store";

function checkBizCode(el, binding) {
  const { value } = binding;
  const codeList = getStore({ name: "maCodeList" }, false);

  if (value && value instanceof Array) {
    if (value.length > 0 && codeList?.length > 0) {
      const permissionRoles = value;

      const hasPermission = codeList.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`need roles! Like v-checkBizCode="['admin','editor']"`);
  }
}

export default {
  inserted(el, binding) {
    checkBizCode(el, binding);
  },
  update(el, binding) {
    checkBizCode(el, binding);
  },
};

/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import { getStore } from "@/utils/store";

function checkRole(el, binding) {
  const { value } = binding;
  const roles = getStore({ name: "roles" }, false);

  if (value && value instanceof Array) {
    if (value.length > 0 && roles?.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`need roles! Like v-checkRole="['admin','editor']"`);
  }
}

export default {
  inserted(el, binding) {
    checkRole(el, binding);
  },
  update(el, binding) {
    checkRole(el, binding);
  },
};

/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

export const queryMenusByModuleId = (moduleId) => {
  return request({
    url: `/ami/ma01-00-101/menu/getMenusByModuleId`,
    method: "post",
    params: {
      moduleId: moduleId,
    },
  });
};

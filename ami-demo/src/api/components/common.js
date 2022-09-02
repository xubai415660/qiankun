/********************************************************
 * @description：组件接口
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

export function queryCodeCls(data) {
  return request({
    url: "/ami/ma01-04-003/code-cls-val/queryCodeClsValCache",
    method: "post",
    data: data,
  });
}

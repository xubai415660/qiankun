/********************************************************
 * @description：公共接口
 * @author：省侧
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

export function queryChildOrg(data) {
  return request({
    url: "/ami/ma01-04-003/mgt-org/queryCache",
    method: "post",
    params: data,
  });
}

export function queryAllOrg(data) {
  return request({
    url: "/ami/ma01-04-003/common/queryCurrTree",
    method: "post",
    params: data,
  });
}

export function queryInitOrg(data) {
  return request({
    url: "/ami/ma01-04-003/mgt-org/query-one",
    method: "post",
    params: data,
  });
}

export function getSelectByCodeCls(data) {
  return request({
    url: "/ami/ma01-04-003/code-cls-val/queryCodeClsValCache",
    data: data,
    method: "post",
  });
}

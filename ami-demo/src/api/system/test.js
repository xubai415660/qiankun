/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise}
 */
export function queryInfo(data) {
  return request({
    url: "/api/ami/sub/query-s-sub",
    data: data,
    method: "post",
  });
}

/**
 * 根据ID查询
 * @param data
 * @returns {AxiosPromise}
 */
export function viewinfo(data) {
  return request({
    url: "/api/ami/sub/view-s-sub",
    data: data,
    method: "post",
  });
}

/**
 * 新增
 * @param data
 * @returns {AxiosPromise}
 */
export function addInfo(data) {
  return request({
    url: "/api/ami/sub/add-s-sub",
    data: data,
    method: "post",
  });
}

/**
 * 更新
 * @param data
 * @returns {AxiosPromise}
 */
export function updateInfo(data) {
  return request({
    url: "/api/ami/sub/update-s-sub",
    data: data,
    method: "post",
  });
}

/**
 * 删除
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteinfo(data) {
  return request({
    url: "/api/ami/sub/delete-s-sub",
    method: "post",
    data: data,
  });
}

/**
 * 批量删除
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteInfoBatch(data) {
  return request({
    url: "/api/ami/sub/delete-s-sub-batch",
    method: "post",
    data: data,
  });
}

export function exportExcel() {
  return request({
    url: "/ami/student/exportXls",
    method: "get",
    responseType: "blob",
  });
}

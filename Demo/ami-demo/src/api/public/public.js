/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

/**
 * 根据码值类型查码值表
 * @param data
 * @returns {AxiosPromise}
 */
export function querySelect(data) {
  return request({
    url: "/ami/ma01-04-003/code/querySelect",
    method: "post",
    data,
  });
}
/**
 * 除excel外的附件预览
 * @param data
 * @returns {AxiosPromise}
 */
export function onlinePreview(data) {
  return request({
    url: "/ami/ma01-02-064/filepreview/onlinePreview",
    data: data,
    method: "post",
    responseType: "blob",
  });
}
/**
 * excel 预览
 * @param data
 * @returns {AxiosPromise}
 */
export function downLoadFile(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/fileDownLoad",
    data: data,
    method: "post",
    responseType: "blob",
  });
}
/**
 * excel 表格编辑
 * @param data
 * @returns {AxiosPromise}
 */
export function addOrUpdExcel(data) {
  return request({
    url: "/ami/ma01-02-061/excelonline/addOrUpdExcel",
    data: data,
    method: "post",
  });
}

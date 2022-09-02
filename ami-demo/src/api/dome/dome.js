/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import request from "@/utils/axios";

// 下载文件
export function downLoadFile(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/fileDownLoad",
    data: data,
    method: "post",
    responseType: "blob",
  });
}

//在线编辑Excel-新增或修改更新excel文件
export function addOrUpdExcel(data) {
  return request({
    url: "/ami/ma01-02-061/excelonline/addOrUpdExcel",
    data: data,
    method: "post",
    responseType: "blob",
  });
}
//流程图
export function queryTaskProcess(data) {
  return request({
    url: "/ami/ma01-02-062/confirm-info/queryTaskProcess",
    data: data,
    method: "post",
  });
}
//流程图
export function queryTreeAll(data) {
  return request({
    url: "/ami/ma01-04-003/resource/query",
    data: data,
    method: "post",
  });
}
// 组织部门接口

export function selectMgtOrg(data) {
  return request({
    url: "/ami/ma01-02-063/researchTask/selectMgtOrg",
    data: data,
    method: "post",
  });
}
//调研任务管理
export function selectTask(data) {
  return request({
    url: "/ami/ma01-02-063/researchTask/selectTask",
    data: data,
    method: "post",
  });
}

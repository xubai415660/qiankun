/**
 * @description：大文件上传api
 * @author：宋乾
 * @date：Created in 2022/02/16 16:45
 * @modified By：
 * @version: 1.0.0
 */
import request from "@/utils/axios";

/**
 * 上传分片
 * @returns
 */
export function fileSliceUpload(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/fileSliceUpload",
    method: "POST",
    data,
  });
}

/**
 * 合并文件分片
 * @returns
 */
export function mergeSlice(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/mergeSlice",
    method: "POST",
    data,
  });
}

/**
 * 小文件上传,不分片
 * @returns
 */
export function fileUpload(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/fileUpload",
    method: "POST",
    data,
  });
}

/**
 * 删除文件
 * @returns
 */
export function deleteFile(data) {
  return request({
    url: "/ami/ma01-02-056/minio-file/deleteFile",
    method: "POST",
    data,
  });
}

/*
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 10:28:05
 * @Modified By:
 * @version: 1.0.0
 */
import request from '@utils/request'

// get 请求
export const testApi = (params) => {
  return request({
    url: '/api/v1/images/search',
    method: 'get',
    params // params: params 简写
  })
}

// post 请求
export const testApiPost = (params) => {
  return request({
    url: '/api/v1/images/search',
    method: 'get',
    data: params
  })
}

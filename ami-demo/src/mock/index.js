/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import Mock from "mockjs";
import { queryMenusByParentId } from "./menu";
import { queryList } from "@/mock/modules/list";
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000,
});

// 登录相关和获取用户信息
Mock.mock(/\/query-menus-by-parent-id/, queryMenusByParentId);
// 列表数据
Mock.mock(/\/ami\/ma01-99-999\/testList\/queryTestList/, queryList);
export default Mock;

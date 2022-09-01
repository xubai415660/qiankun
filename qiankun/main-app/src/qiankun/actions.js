/*
 * @description: 乾坤提供的通信方式
 * @author: 王浩
 * @Date: 2022-08-27 17:16:32
 * @Modified By: 微应用通过 props 获取通信方法
 * @version: 1.0.0
 */
import Vue from 'vue';
import { initGlobalState } from 'qiankun'

export const qiankunActions = initGlobalState({
  // 事件触发来源
  eventFrom: '',
  // 事件的标识
  eventCode: '',
  // 事件传递的参数
  eventData: {}
})

export const qiankunEventBus = new Vue();

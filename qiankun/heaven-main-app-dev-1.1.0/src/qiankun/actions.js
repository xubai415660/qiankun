import Vue from 'vue'
import { initGlobalState } from 'qiankun';

export const qiankunActions = initGlobalState({
    // 事件触发来源
    eventFrom: '',
    // 事件的标识
    eventCode: '',
    // 事件传递的参数
    eventData: {}
});

export const qiankunEventBus = new Vue()

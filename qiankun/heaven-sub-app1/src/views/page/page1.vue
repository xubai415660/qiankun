<!--
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 16:12:47
 * @Modified By:
 * @version: 1.0.0
-->
<template>
  <div>
    <el-button @click="setGlobalState" type="primary">修改globalstate</el-button>
    <el-button @click="setGlobal_Tabs" type="primary">关闭当前标签页</el-button>
    <el-button @click="setGlobal_login" type="primary">退出登录</el-button>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Page1',
    methods: {
        setGlobalState () {
            this.$setGlobalState({
                // 事件触发来源
                eventFrom: 'microApp',
                // 事件的标识
                eventCode: 'testEvent',
                // 事件传递的参数
                eventData: {
                    time: new Date().getTime(),
                    info: '王浩'
                }
            })
        },
        // 关闭当前标签页
        setGlobal_Tabs (){
            this.$setGlobalState({
                // 事件触发来源
                eventFrom: 'microApp',
                // 事件的标识
                eventCode: 'removeCurrentTabs',
                // 事件传递的参数
                eventData: {
                    removeType: 1
                }
            })
        },
        // 退出登录
        setGlobal_login () {
            this.$setGlobalState({
                // 事件触发来源
                eventFrom: 'microApp',
                // 事件的标识
                eventCode: 'logout',
                // 事件传递的参数
                eventData: ''
            })
        }
    }
}
</script>

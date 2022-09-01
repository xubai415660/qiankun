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
    <el-button @click="startGlobalStateListener" type="primary">开启globalstate监听</el-button>
    <el-button @click="emitEventBus" type="primary">eventBus发布事件</el-button>
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
          time: new Date().getTime()
        }
      })
    },
    // 开启监听
    startGlobalStateListener () {
      this.$onGlobalStateChange((state) => {
        console.log('子应用监听到globalState发生改变', state)
      })
    },
    // 发布事件
    emitEventBus () {
      this.$qiankunEventBus.$emit('testEvent', {
        time: new Date().getTime(),
        info: '王浩'
      })
    }
  }
}
</script>

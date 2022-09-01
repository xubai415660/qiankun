<template>
  <div>
    <el-button @click="emitEvent_login" type="primary">eventBus退出登录</el-button>
    <el-button @click="go_item" type="primary" round>跳转</el-button>
    <hr>
    <el-button @click="closeCurrentTab" type="primary">关闭当前标签页</el-button>
  </div>
</template>
<script>
export default {
    name: 'Page2',
    methods: {
        go_item (){
            // 判断是否为子应用
            if (window.__POWERED_BY_QIANKUN__){
                this.$router.push({
                    path: '/micro-app/micro-app/page3',
                    query: {
                        from: 'App2ExampleA1'
                    }
                });

            } else {
                this.$router.push({
                    path: '/micro-app/page3'
                });
            }
        },
        // 退出登录
        emitEvent_login () {
            this.$qiankunEventBus.$emit('logout');
        },
        // 关闭当前标签页
        closeCurrentTab () {
            this.$qiankunEventBus.$emit('removeCurrentTabs', {removeType: 3});
        }
    }
}
</script>

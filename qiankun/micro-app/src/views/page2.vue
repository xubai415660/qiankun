<!--
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 17:24:26
 * @Modified By:
 * @version: 1.0.0
-->
<template>
  <div>
    <p>userInfo： {{ userInfo }}</p>
    <el-button @click="dispatchMainAppVuexFn" type="primary">调用vueX中定义的方法</el-button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Page1',
  computed: {
    // 用户信息
    userInfo () {
      // 如果处于 qiankun 环境中，那么访问 qiankunCommonStore 模块，否则访问 common 模块
      return window.__POWERED_BY_QIANKUN__
        ? this.$store.getters['qiankunCommonStore/getUserInfo']
        : this.$store.getters['common/getUserInfo']
    }
  },
  methods: {
    dispatchMainAppVuexFn () {
      this.$store.dispatch(`${window.__POWERED_BY_QIANKUN__ ? 'qiankunCommonStore' : 'common'}/setUserInfo`, {
        name: `你好：${new Date().getTime()}${this.userInfo.name}`
      })
    }
  }
}
</script>

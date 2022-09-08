<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div id="app">
    <component :is="componentTag"></component>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  data() {
    return {
      componentTag: "",
    };
  },
  props: {
    componentName: {
      type: String,
    },
    componentPath: {
      type: String,
    },
  },
  mounted() {
    let _this = this;
    // 根据入参注册相应组件进行渲染
    Vue.component(_this.componentName, () => import(`@/views${_this.componentPath}`));
    this.componentTag = this.componentName;
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  font-family: "Source Han Sans CN";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ececec;
  color: #2c3e50;
}

div {
  box-sizing: border-box;
}
</style>

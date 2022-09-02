<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div ref="qiankunApp"></div>
</template>
<script>
import { loadMicroApp } from "qiankun";

export default {
  name: "Qiankun",
  data() {
    return {
      microApp: null,
    };
  },
  props: {
    url: {
      type: String,
      require: true,
    },
    componentName: {
      type: String,
      require: true,
    },
    componentPath: {
      type: String,
      require: true,
    },
  },
  async mounted() {
    if (this.url && this.componentName && this.componentPath) {
      const { qiankunApp } = this.$refs;
      this.microApp = loadMicroApp({
        name: this.componentName,
        entry: this.url,
        container: qiankunApp,
        props: {
          componentName: this.componentName,
          componentPath: this.componentPath,
        },
      });
    }
  },
  beforeDestroy() {
    // console.log()
    this.microApp.unmount();
  },
};
</script>

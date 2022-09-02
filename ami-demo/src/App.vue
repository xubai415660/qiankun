<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    windowResize() {
      return this.$store.state.permission.windowResize;
    },
  },
  methods: {
    changeSize() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        console.log("===this.windowResize==", this.windowResize);
        this.$store.commit("UPDATE_WINDOW_RESIZE", this.windowResize + 1);
      }, 500);
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("app"), () => {
      this.changeSize();
    });
  },
};
</script>
<style>
#app {
  height: 100%;
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ececec;
  color: #2c3e50;
}

div {
  box-sizing: border-box;
}
</style>

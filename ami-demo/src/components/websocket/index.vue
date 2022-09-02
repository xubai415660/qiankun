<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template><span></span></template>
<script>
export default {
  name: "index",
  props: {
    wsUrl: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      socket: "",
    };
  },
  watch: {
    wsUrl: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  methods: {
    init() {
      if (this.wsUrl && this.wsUrl.trim() !== "") {
        if (typeof WebSocket === "undefined") {
          console.error("您的浏览器不支持socket");
          this.$message({
            message: "您的浏览器不支持socket",
            type: "warning",
          });
        } else {
          if (this.socket) {
            this.socket.close();
          }

          // 实例化socket
          this.socket = new WebSocket(this.wsUrl);
          // 监听socket连接
          this.socket.onopen = this.open;
          // 监听socket错误信息
          this.socket.onerror = this.error;
          // 监听socket消息
          this.socket.onmessage = this.getMessage;
          // 销毁监听
          this.socket.onclose = this.close;
        }
      }
    },
    open() {
      console.log("socket连接成功");
      this.$emit("open");
    },
    error() {
      console.log("连接错误");
      this.$emit("error");
    },
    getMessage(msg) {
      console.log(msg, msg.data);
      this.$emit("message", msg);
    },
    send(msg) {
      if (this.socket) {
        this.socket.send(msg);
      } else {
        console.error("socket is not exists");
      }
    },
    close() {
      if (this.socket) {
        this.socket.close();
        console.log("socket已经关闭");
        this.$emit("close");
      } else {
        console.error("socket is not exists");
      }
    },
  },
  beforeDestroy() {
    this.close();
  },
};
</script>

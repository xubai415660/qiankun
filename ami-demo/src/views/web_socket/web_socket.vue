<!-- --------------------------------------------------------
 @description：消息推送
 @author：张时友
 @date：Created in   2022/6/23 15:38
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <div class="web_socket">
    <WebSocket :wsUrl="url" />

    <h1>图片回显</h1>
    <img :src="imgUrl + '571672085949939712'" alt="" style="width: 200px; height: 200px" />
    <p>数据{{ num }}</p>
    <ami-button @click="num++">+</ami-button>
    <ami-button @click="num--">-</ami-button>
    <ami-button @click="setData">remoteStore存数据</ami-button>
  </div>
</template>

<script>
import WebSocket from "@/components/websocket";

const host = window.location.host;
const origin = window.location.origin;
import { getRoles, getToken } from "@/utils/store";
import { remoteStore } from "@/utils/remoteUtil";

export default {
  name: "web_socket",
  components: {
    WebSocket,
  },
  data() {
    return {
      imgUrl: origin + "/ami/ma01-02-056/minio-file/imageView?fileId=",
      url:
        "ws://" + //固定
        host + //固定
        "/ami/ma01-02-065/backNotifySocket/" +
        // getUserInfo().operatorId + //固定
        "32232323232323232" +
        "/0/" +
        getRoles() + //固定
        "/" +
        getToken(), //固定
      num: 0,
    };
  },
  mounted() {},
  methods: {
    setData() {
      remoteStore.set("mf0100999", this.num);
    },
  },
};
</script>

<style scoped lang="scss">
.web_socket {
  margin: 0 20px;
}
</style>

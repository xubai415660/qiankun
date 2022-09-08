<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="about">
    <h1>sub0102</h1>
    <ami-button type="primary" @click="update">更新姓名</ami-button>
    {{ form.input }}
    <ami-input
      v-model="form.input"
      v-validate="{ ...validateRule, set: form }"
      placeholder="请输入内容"
      @input="changeValue"
    ></ami-input>
    <ami-button @click="test1">测试跳转home</ami-button>
    <ami-button @click="test2">测试跳转其他模块</ami-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "@/store";
import { remoteEvent, remoteRoute } from "@/utils/remoteUtil";

export default {
  name: "AMI0100001-02",
  computed: {
    ...mapState("global", {
      user: (state) => state.user, // 获取父应用的user信息
    }),
  },
  components: {},
  data() {
    return {
      treeId: "",
      input: "123",
      form: {
        input: "123",
      },
      seriesData: [],
      legendConfig: {
        bottom: 0,
        left: "center",
      },
      validateRule: {
        name: "input",
        type: "custom",
        rule: /['"|~$%^&*;<>?·！@￥%……&*（）—+【】{}、|：”；’《》？，。/=]/,
      },
    };
  },
  mounted() {
    // console.log(this.$route);
    if (this.$route?.name === "AMI0100001-02" && this.$route?.query?.treeId) {
      this.treeId = this.$route.query?.treeId;
    }
    setTimeout(() => {
      this.seriesData = [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ];
    }, 5000);
    remoteEvent.on("noticeAll", this.print);
  },
  methods: {
    ...mapActions("global", ["setGlobalState"]),
    getData(e) {
      console.log(e);
    },
    update() {
      this.setGlobalState({ userInfo: { name: "sub01的张三" } });
    },
    test1() {
      // let _this = this;
      // console.log("123:::", { openMenu: { path: "/sub01/home", query: { name: _this.input } } });
      // this.setGlobalState({ openMenu: { path: "/sub01/home", query: { name: _this.input } } });

      remoteRoute.openMenu("/sub01/home", { name: this.input });
    },
    test2() {
      let _this = this;
      this.setGlobalState({ openMenu: { path: "/sub02/about", query: { name: _this.input } } });
    },
    print(data) {
      console.log(data);
    },
    changeValue(val) {
      console.log("====va===", val);
      // this.input = val;
    },
  },
  created() {
    console.log("userInfo", store.getters.userInfo);
  },
  beforeDestroy() {
    remoteEvent.off("noticeAll", this.print);
  },
};
</script>

<!----------------------------------------------------------------------------
 @description 子应用页面框架文件 （禁动）
 @author：基座组提供
 @date：Created in  2022/2/15 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div style="width: 100%; height: 126px; background: linear-gradient(180deg, #0069c4, #0055ae)" v-if="!isQiankun">
      <ami-tooltip
        class="item"
        effect="dark"
        content="点击登录调登录服务接口,模拟登录获取token和用户信息,"
        placement="top-start"
      >
        <ami-button @click="login" type="success">登 录</ami-button>
      </ami-tooltip>
      <span v-for="item in menus" :key="item.menuNo" :index="item.menuNo">
        <ami-button :type="active === item.path ? 'primary' : ''" style="margin: 6px" @click="select(item.path)">
          {{ item.menuName }}
        </ami-button>
      </span>
    </div>
    <div
      :style="{
        width: '100%',
        height: isQiankun ? '100%' : 'calc(100% - 144px)',
      }"
    >
      <keep-alive :exclude="uncacheList" :include="cacheList">
        <router-view v-if="activeDate" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { remoteEvent } from "@/utils/remoteUtil";
import { login, getUserInfo } from "@/api/base/base";
const moduleId = require("../../../package.json").moduleId.toLowerCase();
import { setStore } from "@/utils/store";
import { sm2Encode } from "@/utils/sm";
export default {
  name: "layout",
  computed: {
    ...mapState({
      menus: (state) => state.permission.menus,
      showMenu: (state) => state.permission.showMenu,
    }),
    isQiankun() {
      return !!window.__POWERED_BY_QIANKUN__ || !!this.showMenu;
    },
  },
  data() {
    return {
      active: "",
      cacheList: [],
      uncacheList: [],
      activeDate: true,
    };
  },
  mounted() {
    this.cacheList = this.menus.map((item) => item.resourceCode);
    // 主应用更新tabs触发
    remoteEvent.on("public.home.updateCacheList", (list) => {
      let cacheList = [];
      list.forEach((element) => {
        cacheList.push(element.meta.resourceCode);
      });
      this.cacheList = cacheList.concat([]);
      console.log("====11111==public.home.updateCacheList==", this.cacheList);
    });
    remoteEvent.on("public.home.refresh.tab", (detail) => {
      if (detail.path.indexOf(moduleId) > -1) {
        this.cacheList = this.cacheList.filter((item) => {
          return item !== detail.meta.resourceCode;
        });
        this.activeDate = false;
        this.$nextTick(() => {
          this.activeDate = true;
          this.cacheList.push(detail.meta.resourceCode);
        });
      }
    });
    this.select(this.$route.path);
  },
  methods: {
    select(path) {
      if (this.isQiankun) return;
      console.log(path);
      this.active = path;
      setStore({ name: moduleId + "-router", content: path, type: "session" }, false);
      this.$router.push({
        path: path,
      });
    },
    login() {
      let param = {
        username: sm2Encode("zsy"),
        captchaVerification: "",
        clientId: "sea",
        clientSecret: "sea",
        grantType: "password",
        pd: "04fb8da362ebfd7dc64dab51593fea5e1baaccff0c6747dd1b39fa7c036934a262cca866a34532e0651128d49ff0f72ed358867980ca697641f4c21c254f51fc3012149cf381a94d678d495696ee9764fc077d924ff7b7be985dd47ad5f5ae5889ab2f9dc70a985d20",
      };
      login(param).then((res) => {
        let data = res.data.data;
        console.log("登录=========>", data);
        setStore({ name: "token", content: data.accessToken, type: "session" }, false);
        setStore(
          {
            name: "refreshToken",
            content: data.refreshToken,
            type: "session",
          },
          false
        );
        this.$notify({
          title: "获取token成功",
          type: "success",
          duration: 3000,
        });
        getUserInfo().then((res) => {
          console.log("用户信息=========>", res);
          let userinfo = res.data.data;
          setStore({ name: "userInfo", content: userinfo, type: "session" }, false);
          setStore({ name: "roles", content: userinfo.roles, type: "session" }, false);
          setStore({ name: "maCodeList", content: userinfo.permissions, type: "session" }, false);
          this.$notify({
            title: "获取用户信息成功",
            type: "success",
            duration: 3000,
          });
        });
      });
    },
  },
};
</script>

<style scoped></style>

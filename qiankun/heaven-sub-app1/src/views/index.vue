<!--
 * @description:
 * @author: 王浩
 * @Date: 2022-08-27 16:12:47
 * @Modified By:
 * @version: 1.0.0
-->
<template>
  <el-container class="micro-index-page">
    <el-header v-if="!isPoweredByQiankun" class="micro-index-page-header flex-row-vcenter">
      <div class="micro-index-page-header-logo"></div>
      <div class="micro-index-page-header-title">子应用</div>
      <div class="micro-index-page-header-name">{{ userInfo.name }}</div>
    </el-header>
    <el-container>
      <el-aside v-if="!isPoweredByQiankun" width="200px">
        <el-menu class="h100" router :default-active="$route.path">
          <el-menu-item v-for="(item,index) in routerList[0].children" :key="index" :index="`/micro-app/${item.path}`">{{ item.name }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="index-page-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from '@/router/routes.js';
export default {
    name: 'Index',
    computed: {
        isPoweredByQiankun () {
            return Boolean(window.__POWERED_BY_QIANKUN__)
        }
    },
    data () {
        return {
            routerList: router,
            userInfo: {
                name: '王浩'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.micro-index-page {
  width: 100%;
  height: 100vh;
  &-header {
    background-image: url('~@/assets/images/header.png');
    background-size: 100% 100%;
    &-logo {
      width: 120px;
      height: 40px;
      background-image: url('~@/assets/images/logo.png');
      background-size: 100% 100%;
    }
    &-title {
      font-size: 24px;
      line-height: 40px;
      color: #fff;
      padding-left: 40px;
      position: relative;
      &:before {
        width: 2px;
        height: 18px;
        background-color: #fff;
        opacity: 0.5;
        content: '';
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -8px;
      }
    }
    &-name{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
    }
  }
  .index-page-main {
    padding: 0 !important;
  }
}
</style>

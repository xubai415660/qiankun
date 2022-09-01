<template>
  <el-container class="index-page">
    <el-header class="index-page-header flex-row-vcenter">
      <div class="index-page-header-logo"></div>
      <div class="index-page-header-title flex1-row">乾坤微前端</div>
      <div class="index-page-header-user">
        {{ userInfo.name }}
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="h100" router :default-active="$route.path">
          <el-submenu index="/micro-app/page1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>微应用1</span>
            </template>
            <el-menu-item index="/micro-app/page1">修改</el-menu-item>
            <el-menu-item index="/micro-app/page2">子页面</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-page-main">
        <div id="microAppContainer">子应用的容器</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { registerApps } from '@/qiankun'
import { qiankunActions, qiankunEventBus } from '@/qiankun/actions'
import qiankunCommonStore from '@/store/modules/common';
export default {
  // eslint-disable-next-line
  name: 'Index',
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo'
    })
  },
  mounted () {
    registerApps([
      {
        // 必选，微应用的名称，微应用之间必须确保唯一。
        name: 'micro-app',
        // 必选，微应用的入口。
        entry: 'http://localhost:9081/child/micro-app/',
        // 必选，微应用的激活规则。
        activeRule: '#/micro-app',
        // 必选，微应用的容器节点的选择器或者 Element 实例。
        container: '#microAppContainer',
        // 可选，主应用需要传递给微应用的数据。
        props: {
          time: new Date().getTime(),
          // qiankunEventBus在注册微应用时，在 props 中传给子应用(**)
          qiankunEventBus,
          // vuex 共享数据
          qiankunCommonStore
        },
        // 可选，loading 状态发生变化时会调用的方法。
        loader: (loading) => {
          if (loading) {
            this.$loading({
              lock: true,
              text: '加载中...',
              background: 'rgba(255, 255, 255, 0.7)'
            })
          } else {
            this.$loading({}).close()
          }
        }
      }
    ]),
    // 开启监听，当globalState发生改变时触发
    qiankunActions.onGlobalStateChange((state) => {
      console.log('主应用监听到globalState发生改变', state)
    })
    // 监听testEvent事件（监听使用）
    qiankunEventBus.$on('testEvent', (props) => {
      console.log('主应用EventBus监听到testEvent事件', props)
    })
  },
  beforeDestroy () {
    // 销毁监听
    qiankunActions.offGlobalStateChange()
    // 页面销毁时，eventBus销毁监听
    qiankunEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
.index-page {
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
    &-user{
      font-size: 18px;
      line-height: 40px;
      color: #fff;
    }
  }
  .index-page-main {
    padding: 0 !important;
    #microAppContainer {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>

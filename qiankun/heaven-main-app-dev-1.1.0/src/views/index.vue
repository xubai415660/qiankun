<template>
  <div class="main-app-index-page flex-col">
    <div class="main-app-index-page-header flex-row-vcenter">
      <div class="flex-row flex-row-vcenter">
        <img class="main-app-index-page-header-logo" src="@/assets/images/index/logo.png" alt="" />
        <p class="main-app-index-page-header-title">乾坤微前端专题</p>
      </div>
      <div class="micro-app-list flex1-row flex-row-vcenter flex-row-start">
        <el-button
          v-for="(item, index) in userMicroApps"
          :key="index"
          type="text"
          :class="{
            'micro-app-list-item-active': currentMicroApp && currentMicroApp.microAppId === item.microAppId
          }"
          class="micro-app-list-item"
          @click="setCurrentMicroApp({ ...item, notClearTabs: true })"
        >
          <span>{{ item.microAppName }}</span>
        </el-button>
      </div>
      <div class="flex-row flex-row-vcenter">
        <el-avatar> 头像 </el-avatar>
        <el-dropdown trigger="click" @command="handleDropdownMenuClick">
          <p class="user-name">
            <span>{{ userInfo.operName }}</span>
            <i class="el-icon-caret-bottom"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1" icon="el-icon-s-data">{{ userInfo.orgName }}</el-dropdown-item>
            <el-dropdown-item command="changePwd" icon="el-icon-edit-outline">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="main-app-index-page-container flex1 flex-row">
      <aside-menu :menus="currentMicroAppMenus" :is-collapse="isCollapse"></aside-menu>

      <div class="main-app-index-page-content">
        <Tabs
          :is-collapse="isCollapse"
          :menus="currentMicroAppMenus"
          @change-collapse="handleChangeCollapse"
        ></Tabs>

        <div class="main-app-micro-container">
          <div v-show="!mainAppRoutes.includes($route.name)" id="main-app-micro-container-box"></div>
          <router-view v-show="mainAppRoutes.includes($route.name)"></router-view>
        </div>
      </div>
    </div>

    <change-pwd :show-dialog.sync="showChangePwdDialog"></change-pwd>
  </div>
</template>

<script>
import AsideMenu from '@/components/base/aside-menu/aside-menu';
import Tabs from '@/components/base/tabs/tabs';
import ChangePwd from '@/components/base/change-pwd/change-pwd';
import { mapGetters, mapActions } from 'vuex';
import { registerApps } from '@/qiankun/index.js';
import { qiankunActions, qiankunEventBus } from '@/qiankun/actions';
import qiankunCommonStore from '@/store/modules/common';

export default {
    name: 'Index',
    components: {
        AsideMenu,
        Tabs,
        ChangePwd
    },
    data () {
        return {
            // 主应用的路由
            mainAppRoutes: ['Login', 'Index', 'Welcome', 'NotFound'],
            // 左侧菜单是否折叠
            isCollapse: false,
            // 忘记密码弹窗
            showChangePwdDialog: false
        };
    },
    computed: {
        ...mapGetters('common', {
            // 获取用户信息
            userInfo: 'getUserInfo',
            // 获取用户可访问的微应用信息
            userMicroApps: 'getUserMicroApps',
            // 获取用户当前选中的微应用
            currentMicroApp: 'getCurrentMicroApp',
            // 获取用户当前选中的微应用的菜单
            currentMicroAppMenus: 'getCurrentMicroAppMenus'
        })
    },
    mounted () {
        this.registerApps();
        this.startGlobalStateListener();
        this.startEventBusListener();
    },
    beforeDestroy () {
        qiankunActions.offGlobalStateChange();
        qiankunEventBus.$off();
    },
    methods: {
        ...mapActions('common', {
            // 设置当前打开的微应用
            setCurrentMicroApp: 'setCurrentMicroApp',
            // 退出登录
            logout: 'logout'
        }),
        // 注册微应用
        registerApps () {
            this.setCurrentMicroApp(null);
            // 确保容器存在
            this.$nextTick(() => {
                const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
                let apps = this.userMicroApps.map((i) => {
                    return {
                        // 微应用的名称，微应用之间必须确保唯一
                        name: i.microAppId,
                        // 微应用的入口，指向入口html
                        entry: i.microAppEntry,
                        // 微应用激活规则
                        activeRule: getActiveRule('#/' + i.microAppBaseRoute),
                        // 微应用模的挂载节点
                        container: '#main-app-micro-container-box',
                        // 主应用需要传递给微应用的数据
                        props: {
                            qiankunEventBus,
                            qiankunCommonStore,
                            qiankunStore: this.$store
                        },
                        loader: (loading) => {
                            if (loading) {
                                this.$loading({
                                    lock: true,
                                    text: '加载中...',
                                    background: 'rgba(255, 255, 255, 0.7)'
                                });
                            } else {
                                this.$loading({}).close();
                            }
                        }
                    };
                });
                console.log('apps', apps);
                registerApps(apps);
            });
        },
        // 监听全局状态发生改变
        startGlobalStateListener () {
            qiankunActions.onGlobalStateChange((state) => {
                console.log('基座监听到全局状态发生改变', state);
                let { eventCode, eventFrom } = state;
                // eslint-disable-next-line default-case
                switch (eventCode) {
                case 'logout':
                    if (eventFrom === 'microApp') {
                        this.logout();
                    }
                    break;
                }
            });
        },
        //  EventBus 监听
        startEventBusListener () {
            qiankunEventBus.$on('logout', () => {
                console.log('基座EventBus监听到logout事件');
                this.logout();
            });
        },
        // 点击header右侧的下拉菜单(退出登录)
        handleDropdownMenuClick (command) {
            // eslint-disable-next-line default-case
            switch (command) {
            case 'changePwd':
                this.showChangePwdDialog = true;
                break;
            case 'logout':
                // alert('退出登录');
                this.$alert('确定要退出登录吗?')
                    .then(() => {
                        this.logout();
                        // this.$router.replace('/login');
                    })
                    .catch();
                break;
            }
        },
        // 点击折叠、展开左侧菜单图标
        handleChangeCollapse () {
            this.isCollapse = !this.isCollapse;
        }
    }
};
</script>

<style scoped lang="scss">
@import '~@/common/style/var.scss';
.main-app-index-page {
    width: 100%;
    height: 100%;
    background-color: #f4f7f6;
    &-header {
        height: 72px !important;
        background: linear-gradient(180deg, #2aa795 0%, #056054 100%) !important;
        padding: 0 28px;
        &-logo {
            width: 120px;
            height: 40px;
        }
        &-title {
            font-size: 24px;
            color: #fff;
            font-weight: bold;
            margin-left: 15px;
            margin-right: 15px;
        }
        .micro-app-list {
            padding-left: 15px;
            margin-right: 15px;
            margin-top: 4px;
            border-left: 1px solid #ededed;
            &-item {
                padding-top: 5px;
                padding-bottom: 5px;
                span {
                    font-size: 18px;
                    color: #ffffff99;
                }
            }
            &-item-active {
                span {
                    color: #fff;
                    font-weight: 700;
                }
            }
        }
        .user-name {
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            & > span {
                margin-left: 10px;
                margin-right: 14px;
            }
        }
    }
    &-container {
        padding: 10px 10px 0 0;
        min-height: 0;
        & > .main-app-index-page-content {
            flex: 1;
            overflow-y: auto;
            min-width: 0;
            margin-left: 10px;
            margin-bottom: 10px;
            & > .main-app-micro-container {
                height: calc(100% - 50px);
                & > #main-app-micro-container-box {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                }
            }
        }
    }
}
</style>

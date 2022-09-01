<template>
  <hzwq-tabs
    class="main-frame-tabs"
    v-model="selfCurrentTabsId"
    type="card"
    closable
    @tab-click="clickTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane closable name="home">
      <div slot="label" class="flex-row-vcenter h100">
        <img @click.stop="changeCollapse" v-if="!isCollapse" src="@/assets/images/tabs/is_open.png" alt="" />
        <img @click.stop="changeCollapse" v-else src="@/assets/images/tabs/is_close.png" alt="" />
        <img @click.stop="goHome" class="home-icon" src="@/assets/images/tabs/icon_home.png" alt="" />
      </div>
    </el-tab-pane>

    <el-tab-pane
      v-for="item in currentTabsList"
      :key="item.resourceId"
      :label="item.resourceName"
      :name="item.resourceId"
    >
    </el-tab-pane>

    <!-- 右侧插槽  -->
    <template slot="extra">
      <el-dropdown @command="handlerExtra">
        <el-icon name="arrow-down" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="1">关闭当前标签</el-dropdown-item>
          <el-dropdown-item :command="2">关闭其它标签</el-dropdown-item>
          <el-dropdown-item :command="3">关闭所有标签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </hzwq-tabs>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HzwqTabs from '@/components/base/tabs/hzwq-tabs';
export default {
    name: 'Tabs',
    components: {
        HzwqTabs
    },
    props: {
        // 导航是否折叠
        isCollapse: {
            type: Boolean,
            default: false
        },
        // 原始菜单数据
        menus: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            selfCurrentTabsId: ''
        };
    },
    computed: {
        ...mapGetters('common', {
            currentTabsList: 'getCurrentTabsList',
            currentTab: 'getCurrentTab'
        })
    },
    watch: {
        currentTab: {
            handler (newVal) {
                this.selfCurrentTabsId = newVal.resourceId;
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        ...mapActions('common', {
            setCurrentTab: 'setCurrentTab',
            removeCurrentTabs: 'removeCurrentTabs',
            goHome: 'goHome'
        }),
        // 选中一个选项卡
        clickTab () {
            let currentTab = this.currentTabsList.find((i) => i.resourceId === this.selfCurrentTabsId) || {};
            this.setCurrentTab(currentTab);
            this.$router.push({
                path: currentTab.resourceUrl,
                query: currentTab.query || {}
            });
        },
        // 关闭一个选项卡
        removeTab (resourceId) {
            this.removeCurrentTabs({ removeType: 4, resourceId });
        },
        // 切换左侧菜单折叠
        changeCollapse () {
            this.$emit('change-collapse');
        },
        // 选项卡右侧菜单触发
        handlerExtra (removeType) {
            this.removeCurrentTabs({ removeType });
        }
    }
};
</script>

<style scoped lang="scss">
.h100 {
    height: 100%;
}
.main-frame-tabs ::v-deep {
    .menus-befor-box {
        background: #fff;
        padding: 0 10px;
        cursor: pointer;
    }
    //height: 100%;
    .el-tabs__nav {
        border: none !important;
    }
    .is-active {
        color: #158e7d;
    }

    .el-tabs__header {
        border: none;
        border-bottom: none !important;
        margin-bottom: 10px !important; // 13
        height: 40px;

        .el-tabs__nav-wrap {
            background: #fff;
            height: 40px;
            & > .el-tabs__nav-scroll {
                height: 100%;
                .el-tabs__item:focus.is-active.is-focus:not(:active) {
                    box-shadow: none !important;
                }
            }
        }

        .el-tabs__nav {
            border: none;
            height: 40px;
        }

        #tab-home {
            padding-left: 10px !important;
            padding-right: 10px !important;
            vertical-align: middle;
            .home-icon {
                margin-left: 20px;
            }
            .el-icon-close {
                display: none;
                width: 0;
                height: 0;
            }
        }
    }

    .el-tabs__content {
        background: #fff;
        //height: calc(100% - 50px) !important;
        height: 0px !important;
        overflow: auto;
        position: relative;
        z-index: 100;
        .el-tab-pane {
            height: 100%;
        }
    }

    .el-tabs__item {
        border: none !important;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 10px;
            width: 1px;
            height: 20px;
            background-color: #e5e5e5;
        }
    }
}
</style>

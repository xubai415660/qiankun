<template>
  <div class="main-app-aside-menu" :style="{ width: isCollapse ? '58px' : '240px' }">
    <transition name="el-zoom-in-center">
      <!--   :default-active="currentTabsValue" -->
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :unique-opened="true"
        @select="selectMenu"
        class="my-el-menu"
        background-color="#ffffff"
        text-color="#158e7d"
        active-text-color="#ffffff"
      >
        <aside-menu-item
          :is-collapse="isCollapse"
          :menu="item"
          v-for="item in selfList"
          :key="item.resourceUrl"
        >
          >
        </aside-menu-item>
      </el-menu>
    </transition>
  </div>
</template>
<script>
import AsideMenuItem from './aside-menu-item';
import { cloneDeep } from 'lodash';
export default {
    name: 'AsideMenu',
    components: {
        AsideMenuItem
    },
    props: {
        // 原始菜单数据
        menus: {
            type: Array,
            default () {
                return [];
            }
        },
        // 当前导航菜单是否折叠
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // 树形菜单数据
            // selfList: []
        };
    },
    computed: {
        selfList () {
            let arr = Array.isArray(this.menus) ? cloneDeep(this.menus) : [];
            let idKey = 'resourceId';
            let parendtIdKey = 'pResourceId';
            arr.forEach(function (item) {
                delete item.children;
            });
            let map = {};
            arr.forEach(function (item) {
                map[item[idKey]] = item;
            });
            let val = [];
            arr.forEach(function (item) {
                // 隐藏某些菜单
                if (!item.resourceIsHidden) {
                    let parent = map[item[parendtIdKey]];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        val.push(item);
                    }
                }
            });
            return val;
        }
    },
    methods: {
        // 点击左侧菜单
        selectMenu (resourceUrl) {
            this.$router.push(resourceUrl);
        }
    }
};
</script>

<style scoped lang="scss">
.main-app-aside-menu {
    background-color: #fff;
    overflow-y: auto;
    .my-el-menu {
        border-right: none !important;

        &.el-menu--collapse {
            width: 58px !important;
        }
    }
}
</style>

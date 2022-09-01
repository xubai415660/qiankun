<template>
  <div class="main-app-aside-menu-item">
    <!-- 没有子菜单 -->
    <template v-if="!menu.children || menu.children.length === 0">
      <el-menu-item :index="menu.resourceUrl">
        <i :class="menu.resourceIcon" class="el-icon"></i>
        <span>
          {{ menu.resourceName }}
        </span>
      </el-menu-item>
    </template>

    <!-- 有子菜单 -->
    <el-submenu v-else :index="menu.resourceUrl">
      <template slot="title">
        <i v-if="menu.resourceIcon" :class="menu.resourceIcon" class="el-icon"></i>
        <i v-else class="el-icon"></i>
        <span v-if="!isCollapse || menu.pResourceId">
          {{ menu.resourceName }}
        </span>
      </template>

      <template v-for="child in menu.children">
        <!-- 这里是类似递归循环 -->
        <aside-menu-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.resourceId"
          :menu="child"
          :is-collapse="isCollapse"
        ></aside-menu-item>
        <el-menu-item v-else :key="child.resourceId" :index="child.resourceUrl">
          <i class="el-icon"></i>
          {{ child.resourceName }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name: 'AsideMenuItem',
    components: {},
    props: {
        menu: {
            type: Object,
            default () {
                return {};
            }
        },
        /**
         * 导航是否折叠
         * */
        isCollapse: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/common/style/var.scss';
.main-app-aside-menu-item {
    .el-menu-item {
        height: 49px !important;
        line-height: 49px !important;
        font-size: 13px;
    }

    // 悬停样式
    ::v-deep .el-submenu__title:hover,
    .el-menu-item:hover {
        background-color: #e6f3f3 !important;
    }
    // 高亮样式
    .el-menu-item.is-active {
        background-color: $color-primary !important;
    }
    // 图标大小
    .el-icon {
        width: 16px;
        height: 16px;
        font-size: 16px;
        margin-right: 5px;
        color: $color-primary;
    }
    // 文字大小
    ::v-deep .el-submenu__title {
        font-size: 13px;
        font-weight: 500;
        color: $color-primary;
        padding-left: 20px;
        height: 49px;
        line-height: 49px;
    }
    [class^='el-icon-'],
    [class*=' el-icon-'] {
        vertical-align: middle;
    }
    /* 更改菜单项右侧箭头图标样式*/
    ::v-deep .el-icon-arrow-down:before {
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        color: $color-primary;
        font-weight: 700;
        font-size: 14px;
    }
    .navigation-item {
        font-size: 13px;
        font-weight: 500;
        color: $color-primary;
    }
    .navigation-item.el-menu-item.is-active {
        background-color: $color-primary;
        color: #fff !important;
    }
}
</style>

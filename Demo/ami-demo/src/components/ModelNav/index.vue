<!----------------------------------------------------------------------------
 @description：封装导航组件
 @author：张时友
 @date：Created in  2022/2/11 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->

<template>
  <div class="model-title">
    <div class="table-header-left">
      <div>
        <span
          v-for="item in navList"
          :key="item.key"
          :class="{ 'left-nav-active': active === item.key }"
          class="left-nav"
          @click="navClick(item)"
          >{{ item.label }}</span
        >
      </div>
    </div>
    <div class="table-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "modelNav",
  props: {
    /**
     * @param {Array}
     * @description 可点击数组
     */
    navList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * @param {String}
     * @description 默认选中
     */
    default: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: "",
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      /**
       * @description：G给默认值
       **/
      if (this.default !== "") this.active = this.default;
    },
    /**
     * @description：通知父组件
     * @param：val
     **/
    navClick(val) {
      this.active = val.key;
      this.$emit("on-nav", { label: val.label, key: val.key });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/moduleMain";

.model-title {
  height: 46px;
  line-height: 30px;
  margin: 0 -17px;
  padding: 0 17px;
  border-bottom: 2px solid #cccccc;

  .table-header-left {
    float: left;

    .left-nav {
      display: block;
      float: left;
      height: $_T_H;
      padding: 0 20px;
      font-size: 16px;
      cursor: pointer;
    }

    .left-nav-active {
      color: #00796a;
      border-bottom: 2px solid #00796a;
    }
  }

  .table-header-right {
    float: right;
    height: 100%;
    width: auto;
  }
}
</style>

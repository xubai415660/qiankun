<!----------------------------------------------------------------------------
 @description：列表形式穿梭框
 @author：张时友
 @date：Created in  2022/1/20 11:46
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div :style="{ height }" class="shuttle-box">
    <div class="shuttle-box-left">
      <p>{{ titleObj.leftTitle }}</p>
      <div class="shuttle-box-content">
        <slot name="left" />
      </div>
    </div>
    <div class="shuttle-box-center">
      <ami-button :disabled="disabledLeft" icon="sg-icon-d-arrow-left" size="mini" type="primary" @click="toRight" />
      <ami-button icon="sg-icon-d-arrow-right" size="mini" type="primary" @click="toLeft" />
    </div>
    <div class="shuttle-box-right">
      <p>{{ titleObj.rightTitle }}</p>
      <div class="shuttle-box-content">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShuttleBox",
  props: {
    /**
     * @description：穿梭框的高度
     */
    height: {
      type: String,
      default: "460px",
    },
    /**
     * @description：禁用到到右去按钮
     */
    disabledLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * @description：禁用到到左去按钮
     */
    disabledRight: {
      type: Boolean,
      default: false,
    },
    /**
     * @description：左右两侧标题
     */
    titleObj: {
      type: Object,
      default: () => {
        return {
          leftTitle: "选择数据",
          rightTitle: "已选择数据",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    toRight() {
      this.$emit("toRight");
    },
    toLeft() {
      this.$emit("toLeft");
    },
  },
};
</script>

<style lang="scss" scoped>
$_WIDTH_100: 100%;
.shuttle-box {
  width: $_WIDTH_100;
  background-color: rgba(255, 255, 255, 1);
  display: flex;

  &-left {
    width: calc((#{$_WIDTH_100} - 90px) / 2);
  }

  &-center {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button:first-child {
      margin-bottom: 20px;
    }

    /deep/ .sg-button {
      margin-left: 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: 900;
    }
  }

  &-right {
    width: calc((#{$_WIDTH_100} - 400px) / 2);
  }

  .shuttle-box-left,
  .shuttle-box-right {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
    padding-left: 10px;
    padding-right: 10px;

    p {
      height: 40px;
      line-height: 40px;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }

    .shuttle-box-content {
      width: 100%;
      margin-top: 12px;
      height: calc(100% - 40px - 12px - 12px);
    }
  }
}
</style>

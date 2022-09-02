<template>
  <div class="echarts_one">
    <div class="top">
      <ami-card shadow="hover" class="left">
        <ami-model-title title="分布式光伏用户类型分布"> </ami-model-title>
        <pieTwo style="height: calc(100% - 36px)" />
      </ami-card>
      <ami-card shadow="hover" class="right">
        <ami-model-title title="各单位分布式光伏用户数量">
          <ami-date-picker
            v-model="dataTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy/MM/dd"
            @change="dataTimeChange"
          >
          </ami-date-picker>
        </ami-model-title>
        <lineThree style="height: calc(100% - 36px)" ref="lineThree" />
      </ami-card>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import pieTwo from "./echarts/pie2";
import lineThree from "@/views/demo/echarts/line3";
export default {
  name: "AMI-MA0100999-10",
  components: {
    pieTwo,
    lineThree,
  },
  data() {
    return {
      dataTime: "",
    };
  },
  methods: {
    dataTimeChange(val) {
      console.log(val);
      this.$refs.lineThree.initEcharts(val);
    },
  },
};
</script>

<style scoped lang="scss">
.echarts_one {
  height: 100%;
  width: 100%;
  /deep/ .ami-card__body {
    height: 100%;
  }
  .top {
    height: 400px;
    width: 100%;
    .left {
      height: 100%;
      width: 400px;
      float: left;
    }
    .right {
      height: 100%;
      float: left;
      margin-left: 20px;
      width: calc(100% - 420px);
    }
  }
}
</style>

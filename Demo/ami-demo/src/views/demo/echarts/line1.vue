<template>
  <div style="width: 100%; height: 100%" ref="lineOne"></div>
</template>

<script>
export default {
  name: "line1",
  data() {
    return {
      dom: null,
    };
  },
  methods: {
    initEcharts() {
      this.dom = echarts.init(this.$refs.lineOne);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 68,
        },
        legend: { show: true },
        xAxis: [
          {
            type: "category",
            data: ["08-01", "08-02", "08-03", "08-04", "08-05", "08-06", "08-07"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：个",
            // min: 0,
            // max: 250,
            interval: 50,
          },
          {
            type: "value",
            name: "比例",
            // min: 0,
            // max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: "现有用户",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: "新增用户",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
          },
          {
            name: "光伏用户占比",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
        ],
      };
      this.dom.setOption(option);
      window.addEventListener("resize", () => this.dom.resize(), false);
    },
  },
};
</script>

<style scoped></style>

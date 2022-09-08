<template>
  <div style="width: 100%; height: 100%" ref="pie1"></div>
</template>

<script>
export default {
  name: "pie1",
  props: {
    pieOneData: {
      type: Array,
    },
  },
  data() {
    return {
      dom: null,
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      this.dom = echarts.init(this.$refs.pie1);
      let option = {
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
        },
        legend: { show: true },
        series: [
          {
            name: "入住科室分布",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: true,
            // itemStyle: { borderColor: '#fff', borderWidth: 2 },
            color: [
              "#52A8FF",
              "#00B389",
              "#E27272",
              "#FFC53D",
              "#006EFE",
              "#F5855F",
              "#C099FC",
              "#FFA940",
              "#29EFC4",
              "#F8AEA4",
            ],
            label: {
              // alignTo: 'labelLine', // ! 文字对齐方式
              formatter: function (e) {
                let {
                  data: { percent },
                } = e;
                return `{c|${percent}}`;
              },
              minMargin: 5,
              lineHeight: 15,
              rich: {
                c: { fontSize: 16, align: "left", color: "#666666", padding: [8, 0, 0, 8] },
              },
            },
            data: this.pieOneData,
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

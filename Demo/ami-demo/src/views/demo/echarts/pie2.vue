<template>
  <div style="width: 100%; height: 100%" ref="pie2"></div>
</template>

<script>
export default {
  name: "pie2",
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
      this.dom = echarts.init(this.$refs.pie2);
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
                  data: { value },
                } = e;
                return `{c|${value}}`;
              },
              minMargin: 5,
              lineHeight: 15,
              rich: {
                c: { fontSize: 16, align: "left", color: "#666666", padding: [8, 0, 0, 8] },
              },
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      this.dom.setOption(option);
    },
  },
};
</script>

<style scoped></style>

<template>
  <div style="width: 100%; height: 100%" ref="lineTwo"></div>
</template>

<script>
export default {
  name: "line2",
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
      this.dom = echarts.init(this.$refs.lineTwo);
      let option = {
        legend: { show: true },
        grid: {
          left: 50,
          right: 50,
          bottom: 68,
        },
        xAxis: {
          type: "category",
          data: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
          ],
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 50,
          },
          {
            start: 0,
            end: 50,
          },
        ],
        color: ["#5a72e0"],
        series: [
          {
            type: "line",
            name: "用户",
            data: [
              820, 932, 901, 934, 1290, 1330, 1020, 932, 901, 934, 1290, 2330, 1320, 1932, 2801, 1834, 1890, 1810, 1820,
            ],
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

<template>
  <div style="height: 100%; width: 100%" ref="line3"></div>
</template>

<script>
import { getUserInfo1 } from "@/api/base/base";
export default {
  name: "line3",
  data() {
    return {
      dom: null,
      form: {
        aaa: "",
      },
      xAxisData: [],
      yData1: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // let data = this.form
      // getUserInfo1(data).then((res) => {
      //   console.log(res);
      //   this.xAxisData=res
      this.initEcharts();
      // });
    },
    initEcharts(val) {
      console.log("111===>", val);
      this.dom = echarts.init(this.$refs.line3);
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
        dataZoom: [
          {
            type: "inside",
          },
          {
            type: "slider",
          },
        ],
        legend: {
          data: ["Evaporation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Precipitation",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "Temperature",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
        ],
      };
      this.dom.setOption(option);
    },
  },
};
</script>

<style scoped></style>

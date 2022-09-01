<template>
  <div class="echart-demo">
    <echart-temp :options="options"></echart-temp>
  </div>
</template>

<script>
import EchartTemp from '@/components/echarts/echart-temp.vue'

export default {
  name: 'EchartDemo',
  components: {
    EchartTemp
  },
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let xAxisData = [],
        data1 = [],
        data2 = []
      // eslint-disable-next-line id-length
      for (let i = 0; i < 100; i++) {
        xAxisData.push('类目' + i)
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
      }
      this.drawChart(xAxisData, data1, data2)
    },
    drawChart (xAxisData, data1, data2) {
      this.options = {
        title: {
          text: '柱状图动画延迟'
        },
        legend: {
          data: ['bar', 'bar2']
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
              return idx * 10
            }
          },
          {
            name: 'bar2',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
              return idx * 10 + 100
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-demo {
  width: 800px;
  height: 600px;
  border: 1px solid darkblue;
}
</style>

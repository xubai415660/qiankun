<template>
  <div class="chart-container" ref="container">
    <div class="chart-body" ref="chartDiv" :style="style"></div>
  </div>
</template>

<script>
// 引入防抖函数
import { debounce } from '@/utils'

export default {
    name: 'EchartTemp',
    props: {
        options: {
            type: Object,
            default () {
                return null
            }
        },
        styles: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            style: {},
            chartObj: null,
            chartData: {},
            chartDom: null,
            // eslint-disable-next-line vue/no-reserved-keys
            __resizeHanlder: null
        }
    },
    watch: {
        styles (val, oldVal) {
            this.style = val
        },
        options () {
            this.drawChart()
        }
    },
    mounted () {
    // alert('mounted!');
    // console.log(11111,this.options)
        this.chartDom = this.$refs.chartDiv
        this.chartObj = this.$echarts.init(this.chartDom)
        this.chartObj.on('click', (params) => {
            this.itemClick(params)
        })
        this.chartObj.on('legendselectchanged', (params) => {
            console.log('this.chartObj: ', this.chartObj)
            this.legendClick(this.chartObj, params)
        })
        this.drawChart()
        this.__resizeHanlder = debounce(this.refreshChart)
        // 添加尺寸改变事件
        window.addEventListener('resize', this.__resizeHanlder)
    // this.$bus.$on('toggleSideMenu', this.__resizeHanlder)
    },
    activated () {
    // alert('activated!');
    // 添加尺寸改变事件
    // window.addEventListener('resize', this.__resizeHanlder);
    // this.$bus.$on('toggleSideMenu', this.__resizeHanlder);
        this.resizeChart()
    },
    computed: {},
    methods: {
    // 刷新图表
        refresh () {
            this.drawChart()
        },
        clearChart () {
            // this.chartDom.innerHTML = ''
            this.chartObj.clear()
        },
        resizeChart () {
            let totleHeight = this.$refs['container'].clientHeight
            // this.styles = { height: totleHeight + 'px' };
            this.style = { height: totleHeight + 'px' }
            this.refreshChart()
        },
        refreshChart () {
            // console.log("this.chartObj",this.chartObj.resize);
            this.chartObj.resize()
        },
        drawChart () {
            this.clearChart()
            if (this.options && Object.keys(this.options).length > 0) {
                this.chartObj.setOption(this.options)
            }
        },
        setOption (option) {
            this.chartObj.setOption(option)
            this.drawChart()
        },
        itemClick (params) {
            this.$emit('itemClick', params)
        },
        legendClick (chartObj, params) {
            this.$emit('legendClick', chartObj, params)
        },
        setProps (props) {
            if (Object.keys(props).length > 0) {
                for (let key in props) {
                    this[key] = props[key]
                }
                this.$nextTick(() => {
                    this.resizeChart()
                    this.drawChart()
                })
            }
        }
    },
    beforeDestroy () {
    // alert('beforeDestroy');
        window.removeEventListener('resize', this.refreshChart)
    // this.$bus.$off('toggleSideMenu', this.__resizeHanlder)
    },
    components: {}
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .chart-body {
    flex: 1;
  }
}
</style>

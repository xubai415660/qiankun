<template>
  <div class="chart-container" ref="container">
    <div class="chart-body" ref="chartDiv" :style="style"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { throttle } from 'lodash';
export default {
    name: 'EchartTemp',
    props: {
        options: {
            type: Object,
            default () {
                return null;
            }
        },
        styles: {
            type: Object,
            default () {
                return {};
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
        };
    },
    watch: {
        styles (val, oldVal) {
            this.style = val;
        },
        options () {
            this.drawChart();
        }
    },
    mounted () {
        this.chartDom = this.$refs.chartDiv;
        this.chartObj = echarts.init(this.chartDom);

        this.drawChart();
        this.__resizeHanlder = throttle(this.refreshChart, 200);
        // 添加尺寸改变事件
        window.addEventListener('resize', this.__resizeHanlder);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.__resizeHanlder);
    },
    activated () {
        // 添加尺寸改变事件
        this.resizeChart();
    },
    computed: {},
    methods: {
        // 刷新图表
        refresh () {
            this.drawChart();
        },
        clearChart () {
            this.chartObj.clear();
        },
        resizeChart () {
            let totleHeight = this.$refs['container'].clientHeight;
            this.style = { height: totleHeight + 'px' };
            this.refreshChart();
        },
        refreshChart () {
            this.chartObj.resize();
        },
        drawChart () {
            this.clearChart();
            if (this.options && Object.keys(this.options).length > 0) {
                this.chartObj.setOption(this.options);
            }
        },
        setOption (option) {
            this.chartObj.setOption(option);
            this.drawChart();
        }
    },

    components: {}
};
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

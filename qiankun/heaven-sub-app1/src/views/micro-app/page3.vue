<!--
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 10:07:46
 * @Modified By:
 * @version: 1.0.0
-->
<template>
  <div>
    <p>姓名： {{ userInfo.operName }}</p>
    <p>单位：{{ userInfo.orgName }}</p>
    <el-button @click="dispatchMainAppVuexFn" type="primary">调用vueX中定义的方法-关闭标签</el-button>
    <el-button @click="dispatchMainAppFn" type="primary">退出登录</el-button>
    <div class="echart-demo">
      <echart-temp :options="options"></echart-temp>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EchartTemp from '@/components/echarts/echart-temp.vue'
export default {
    name: 'Page3',
    components: {
        EchartTemp
    },
    data () {
        return {
            options: {}
        }
    },
    computed: {
        ...mapGetters('common', {
            //  是否处于乾坤环境
            isPoweredByQiankun: 'isPoweredByQiankun'
        }),
        // 如果处于 qiankun 环境中，那么访问 qiankunCommonStore 模块，否则访问 common 模块
        userInfo () {
            return this.isPoweredByQiankun
                ? this.$store.getters['qiankunCommonStore/getUserInfo']
                : this.$store.getters['common/getUserInfo'];
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        dispatchMainAppVuexFn (){
            // 如果处于 qiankun 环境中，那么访问 qiankunCommonStore 模块，否则访问 common 模块
            if (this.isPoweredByQiankun){
                this.$store.dispatch('qiankunCommonStore/removeCurrentTab', {removeType: 1})
            } else {
                this.$store.dispatch('common/removeCurrentTab', {removeType: 3})
            }
        },
        // 退出登录
        dispatchMainAppFn () {
            this.$store.dispatch('qiankunCommonStore/logout')
        },
        // 初始化数据
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

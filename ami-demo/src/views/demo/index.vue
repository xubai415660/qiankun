<template>
  <div class="demo">
    <div class="top">
      <ami-card class="box-card top-left">
        <ami-model-title title="分布式光伏用户类型分布" />
        <pieOne :pieOneData="pieOneData" style="height: calc(100% - 36px); width: 100%" />
      </ami-card>
      <ami-card class="box-card top-right">
        <ami-model-title title="分布式光伏用户类型分布">
          <ami-date-picker v-model="dataTime" type="date" @change="dataChange" placeholder="选择日期">
          </ami-date-picker>
        </ami-model-title>
        <lineOne style="height: calc(100% - 36px); width: 100%" ref="lineOne" />
      </ami-card>
    </div>
    <ami-card class="box-card bottom">
      <div class="bottom-top">
        <ami-model-title title="各单位分布式用户数量变化趋势" style="margin-bottom: 20px" />
        <div class="bottom-top-left">供电单位</div>
        <div class="bottom-top-right">
          <ami-button
            round
            :type="buttonData.length === buttonType.length ? 'primary' : ''"
            @click="buttonAllClick(buttonData.length)"
            >全部</ami-button
          >
          <ami-button
            round
            :type="buttonType.includes(item.no) ? 'primary' : ''"
            v-for="item in buttonData"
            :key="item.no"
            @click="buttonClick(item)"
            >{{ item.name }}</ami-button
          >
        </div>
      </div>
      <lineTwo style="width: 100%; height: calc(100% - 140px)" />
    </ami-card>
  </div>
</template>

<script>
import pieOne from "@/views/demo/echarts/pie1";
import lineOne from "@/views/demo/echarts/line1";
import lineTwo from "@/views/demo/echarts/line2";
export default {
  name: "demo-index",
  components: {
    pieOne,
    lineOne,
    lineTwo,
  },
  data() {
    return {
      dataTime: "",
      pieOneData: [
        { value: 50, name: "城镇居民", percent: "50%" },
        { value: 18, name: "乡村居民", percent: "18%" },

        { value: 32, name: "低压一般工商业用户", percent: "32%" },
      ],
      buttonType: [],
      buttonData: [
        {
          no: "11102",
          name: "北京",
        },
        {
          no: "12101",
          name: "天津",
        },
        {
          no: "13102",
          name: "河北",
        },
        {
          no: "14101",
          name: "山西",
        },
        {
          no: "37101",
          name: "山东",
        },
        {
          no: "31102",
          name: "上海",
        },
        {
          no: "32101",
          name: "江苏",
        },
        {
          no: "33101",
          name: "浙江",
        },
        {
          no: "34101",
          name: "安徽",
        },
        {
          no: "35101",
          name: "福建",
        },
        {
          no: "42102",
          name: "湖北",
        },
        {
          no: "43101",
          name: "湖南",
        },
        {
          no: "41101",
          name: "河南",
        },
        {
          no: "36101",
          name: "江西",
        },
        {
          no: "51101",
          name: "四川",
        },
        {
          no: "50101",
          name: "重庆",
        },
        {
          no: "21102",
          name: "辽宁",
        },
        {
          no: "22101",
          name: "吉林",
        },
        {
          no: "23101",
          name: "黑龙江",
        },
        {
          no: "15101",
          name: "蒙东",
        },
        {
          no: "61102",
          name: "陕西",
        },
        {
          no: "62101",
          name: "甘肃",
        },
        {
          no: "63101",
          name: "青海",
        },
        {
          no: "64101",
          name: "宁夏",
        },
        {
          no: "65101",
          name: "新疆",
        },
        {
          no: "54101",
          name: "西藏",
        },
        {
          no: "13103",
          name: "冀北",
        },
      ],
    };
  },
  mounted() {
    this.$refs.lineOne.initEcharts();
  },
  methods: {
    //全选/反选
    buttonAllClick(val) {
      if (this.buttonType.length === val) {
        this.buttonType = [];
      } else {
        this.buttonType = [];
        this.buttonData.forEach((item) => {
          this.buttonType.push(item.no);
        });
      }
    },
// 选中每个省，先判断是否已选中，已选择就删除。没选中就添加
    buttonClick(item) {
      let index = this.buttonType.indexOf(item.no);
      if (index > -1) {
        //大于0 代表存在，//存在就删除
        this.buttonType.splice(index, 1);
      } else {
        //不存在添加
        this.buttonType.push(item.no);
      }
    },
    dataChange(val) {
      console.log("时间改变=====>", val);
      this.$refs.lineOne.initEcharts();
    },
  },
  watch: {
    buttonType: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        console.log("newVal, oldVal=======>", newVal, oldVal);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.demo {
  width: calc(100% - 40px);
  height: 100%;
  margin: 0 20px;
  .ami-card {
    height: 100%;
  }
  /deep/.ami-card__body {
    height: 100%;
  }
  .top {
    width: 100%;
    height: 400px;
    &-left {
      width: 400px;
      height: 400px;
      float: left;
    }
    &-right {
      margin-left: 20px;
      width: calc(100% - 420px);
      height: 400px;
      float: right;
    }
  }
  .bottom {
    width: 100%;
    margin-top: 20px;
    height: calc(100% - 420px);
    &-top {
      height: 140px;

      &-left {
        height: 84px;
        float: left;
        width: 70px;
      }
      &-right {
        height: 84px;
        width: calc(100% - 70px);
        float: left;
        .ami-button {
          margin-bottom: 10px;
          border: 1px solid #edeef5;
        }
      }
    }
  }
}
</style>

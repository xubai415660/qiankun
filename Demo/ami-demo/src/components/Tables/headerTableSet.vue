<!--
 @description：表头设置
 @author：张时友
 @date：Created in  2022/3/24 16:01
 @modified By：
 @version: 1.0.0
 -->
<template>
  <div class="header-table-set">
    <ami-dialog :before-close="cancel" :visible.sync="headerSelectVisible" title="设置" width="960px">
      <div class="header-table-set-body set-body">
        <div class="set-body-left">
          <div class="set-body-title">
            可选字段 <span>（共{{ checkedColumns_.length }}项）</span>
          </div>
          <div class="set-body-box">
            <div>
              <ami-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                全选
              </ami-checkbox>
            </div>
            <div>
              <ami-checkbox-group v-model="checked_" @change="handleCheckedCitiesChange">
                <ami-checkbox v-for="item in checkedColumns_" :label="item" :key="item.key">
                  {{ item.label }}
                </ami-checkbox>
              </ami-checkbox-group>
            </div>
          </div>
        </div>
        <div class="set-body-right">
          <div class="set-body-title">
            已选字段 <span>（共{{ checked_.length }}项）</span>
          </div>
          <div class="set-body-box">
            <ami-draggable v-model="checked_" filter=".disabled-draggable">
              <div v-for="(item, index) in checked_" :key="item.key">
                <div class="set-body-draggable">
                  <div>
                    <i class="ami-icons-zhuangshidian zhuangshidian"></i>
                    {{ item.label }}
                  </div>
                  <div>
                    <i class="icon ami-icon-top" @click="sortUp(index)"></i>
                    <i class="icon ami-icon-close" @click="del(index)"></i>
                  </div>
                </div>
              </div>
            </ami-draggable>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <ami-button @click="cancel">取 消</ami-button>
        <ami-button type="primary" @click="sub">确 定</ami-button>
      </span>
    </ami-dialog>
  </div>
</template>

<script>
import { deepClone } from "../../utils/util";

export default {
  name: "headerTableSet",
  props: {
    headerSelectVisible: {
      type: Boolean,
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    checkList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      checkAll: true,
      isIndeterminate: false,
      checkedColumns_: [],
      checked_: [],
    };
  },
  methods: {
    init() {
      this.checkedColumns_ = this.columns;
      this.checked_ = [];
      for (let j = 0; j < this.checkList.length; j++) {
        for (let i = 0; i < this.checkedColumns_.length; i++) {
          if (this.checkedColumns_[i].key === this.checkList[j].key) {
            this.checked_.push(this.checkedColumns_[i]);
          }
        }
      }
      this.handleCheckedCitiesChange(this.checked_);
    },

    handleCheckAllChange(val) {
      this.checked_ = val ? this.checkedColumns_ : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedColumns_.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedColumns_.length;
    },
    /**
     * @description：删除数组中内容
     **/
    del(index) {
      let list = deepClone(this.checked_);
      list.splice(index, 1);
      this.checked_ = list;
      this.handleCheckedCitiesChange(this.checked_);
    },
    /**
     * @description：上移
     **/
    sortUp(index) {
      console.log(index);
      if (index === 0) {
        console.log("已经是第一个了");
      } else {
        let temp = this.checked_[index - 1];
        this.$set(this.checked_, index - 1, this.checked_[index]);
        this.$set(this.checked_, index, temp);
      }
    },
    /*
     * 确定
     * */
    sub() {
      this.$emit("getColumns", this.checked_);
      this.$nextTick(() => {
        this.cancel();
      });
    },
    /**
     * @description：关闭弹窗
     **/
    cancel() {
      this.$emit("update:headerSelectVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-table-set {
  /deep/ .ami-dialog__body {
    padding-bottom: 0px;
  }
  &-body {
    display: flex;
    height: 500px;
  }

  .set-body {
    &-title {
      font-weight: 700;
      font-size: 14px;
      height: 18px;
      line-height: 18px;
      color: #333333;

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #999999;
      }
    }

    &-left {
      flex: 1;
    }

    &-right {
      width: 300px;
      margin-left: 20px;

      .set-body-box {
        overflow-y: auto;
      }

      .set-body-draggable {
        padding: 6px 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #666666;
        display: flex;
        justify-content: space-between;
        .zhuangshidian {
          margin-right: 12px;
        }
        .icon {
          padding-left: 10px;
          cursor: pointer;
        }
      }

      .set-body-draggable:hover {
        background-color: #f5f5f5;
        cursor: move;
      }
    }

    &-box {
      height: 460px;
      margin-top: 20px;
      padding: 12px;
      border: 1px solid #dee0e6;
      border-radius: 8px;

      /deep/ .ami-checkbox {
        display: inline-block;
        padding: 6px 0;
        width: 140px;
      }
    }
  }
}
</style>

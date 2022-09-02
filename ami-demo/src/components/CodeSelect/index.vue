<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <ami-tree-select
    v-model="codeValue"
    :append-to-body="appendToBody"
    :clearable="clearable"
    :load-options="loadOptions"
    :multiple="false"
    :options="options"
    :searchable="searchable"
    :size="selectSize"
    placeholder="请选择"
    @input="input"
    @select="select"
  />
</template>
<script>
import { getSelectByCodeCls } from "@/api/common";
import { forEach } from "@/utils/tools";

export default {
  name: "code-select",
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    codeClsType: {
      type: String,
    },
    selectSize: {
      type: String,
      default: "",
    },
    value: [String, Array],
  },
  data() {
    return {
      options: [],
      codeValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.setCodeValue(val);
      },
    },
  },
  methods: {
    setCodeValue(value) {
      if (value === "") {
        value = null;
      }
      this.codeValue = value;
    },
    select(node) {
      let data = {
        code: node.id,
        name: node.label,
      };
      this.$emit("on-select", data, "code");
    },
    input(value) {
      if (!value) {
        value = "";
        this.codeValue = null;
        this.$emit("get-value", value, "value");
      } else {
        this.$emit("get-value", value, "value");
      }
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === "LOAD_CHILDREN_OPTIONS") {
        getSelectByCodeCls({ codeClsType: this.codeClsType, prntCodeClsVal: parentNode.id }).then((res) => {
          res = res.data;
          if (res.code === 200) {
            let array = [];
            forEach(res.data, function (item) {
              let data = {
                id: item.codeClsVal,
                label: item.codeClsValName,
              };
              array.push(data);
            });
            parentNode.children = array;
            callback();
          }
        });
      }
    },
    initCode() {
      let _this = this;
      getSelectByCodeCls({ codeClsType: this.codeClsType, prntCodeClsVal: "0" }).then((res) => {
        res = res.data;
        if (res.code === 200) {
          forEach(res.data, function (item) {
            let data;
            if (item.hasChildren === "1") {
              data = {
                id: item.codeClsVal,
                label: item.codeClsValName,
                children: null,
              };
            } else {
              data = {
                id: item.codeClsVal,
                label: item.codeClsValName,
              };
            }
            _this.options.push(data);
          });
        }
      });
    },
  },
  created() {
    this.initCode();
  },
};
</script>

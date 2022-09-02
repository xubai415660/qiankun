<!----------------------------------------------------------------------------
 @description：
 @author：
 @date：Created in  2022/3/22 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <ami-select-tree
    v-model="code"
    :clearable="clearable"
    :default-expanded-keys="defaultExpandedKeys"
    :expand-on-click-node="false"
    :multiple="multiple"
    :popper-append-to-body="appendToBody"
    :props="props"
    :tree-data="treeData"
    node-key="treeId"
    show-parent
    @change="change"
    @change-node="inputChange"
  ></ami-select-tree>
</template>

<script>
import { queryAllOrg } from "@/api/common";
import { getStore, getUserInfo, setStore } from "@/utils/store";

export default {
  name: "org-select-tree",
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    mgtOrgCode: {
      type: String,
    },
    mgtOrgType: {
      type: String,
      default: "mgtorg",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Array],
      default: "",
    },
    dirFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      code: "",
      treeData: [],
      defaultExpandedKeys: [],
      props: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    clear() {
      this.code = "";
    },
    change(data) {
      this.$emit("on-input-change", data);
    },
    inputChange(data) {
      this.$emit("on-select", data);
    },
    createTreeId(treeData) {
      function find(list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].dirFlag) {
            list[i].treeId = list[i].mgtOrgCode + "-Z";
          } else {
            list[i].treeId = list[i].mgtOrgCode + "-F";
          }
          if (list[i].hasChildren && list[i].children) {
            find(list[i].children);
          }
        }
      }

      find(treeData);
    },
    initOrg(val) {
      let storeTreeData = getStore({ name: "orgTree" }, false);
      let userInfo = getUserInfo();
      if (storeTreeData) {
        this.treeData = storeTreeData;
        this.defaultExpandedKeys.push(this.treeData[0].treeId);
        if (userInfo) {
          if (this.treeData[0].treeId !== this.changeOrgCode(userInfo.mgtOrgCode)) {
            this.queryOrg("", userInfo);
          } else {
            if (val) {
              this.code = val;
            } else {
              this.code = this.changeOrgCode(userInfo.mgtOrgCode);
            }
          }
        } else {
          this.code = val;
        }
      } else {
        this.queryOrg(val, userInfo);
      }
    },
    queryOrg(val, userInfo) {
      let queryData = {
        mgtOrgCode: userInfo.mgtOrgCode,
        type: this.mgtOrgType,
      };
      queryAllOrg({ mgtOrgCode: queryData.mgtOrgCode, type: queryData.type }).then((res) => {
        res = res.data;
        if (res.code === 200) {
          this.treeData = res.data;
          this.createTreeId(this.treeData);
          this.defaultExpandedKeys.push(this.treeData[0].treeId);
          setStore({ name: "orgTree", content: this.treeData, type: "session" }, false);
          if (val) {
            this.code = val;
          } else {
            this.code = this.changeOrgCode(userInfo.mgtOrgCode);
          }
        }
      });
    },
    changeOrgCode(val) {
      let code = "";
      if (val.indexOf("-Z") < 0) {
        code = val + "-F";
      } else {
        code = val;
      }
      return code;
    },
    changeValueOrgCode(val, dirFlag) {
      let code = "";
      if (val) {
        if (dirFlag) {
          if (val.indexOf("-") < 0) {
            code = val + "-Z";
          } else {
            code = val;
          }
        } else {
          if (val.indexOf("-") < 0) {
            code = val + "-F";
          } else {
            code = val;
          }
        }
      }
      return code;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.initOrg(this.changeValueOrgCode(val, this.dirFlag));
      },
    },
  },
};
</script>

<style scoped></style>

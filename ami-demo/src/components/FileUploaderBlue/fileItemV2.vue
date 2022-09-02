<!----------------------------------------------------------------------------
 @description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="fileItem">
    <div :style="selfStyleData.iconContainer"><FileIcon :style="selfStyleData.icon" /></div>
    <div :style="selfStyleData.progressContainer">
      <FileTitle
        v-on="$listeners"
        :style="percent === 100 ? selfStyleData.fileTitleSuccess : selfStyleData.fileTitle"
        :file="file"
        :fileId="fileId"
        :percent="percent"
      />
      <ami-progress
        v-if="percent < 100"
        :style="selfStyleData.progress"
        :percentage="percent"
        :stroke-width="2"
        :show-text="false"
      ></ami-progress>
    </div>
    <div :style="selfStyleData.deleteContainer">
      <img
        :style="selfStyleData.deleteIcon"
        :disabled="delFlagAsync"
        src="./assets/delete.png"
        @click="deleteClickHandle()"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import FileIcon from "./fileIcon";
import FileTitle from "./FileTitle";
import UploadHelper from "./uploadHelper";

export default {
  name: "fileItem",
  inject: {
    helper: {
      type: UploadHelper,
      default: () => {},
    },
  },
  props: {
    file: {
      type: Object,
      default: () => {},
      require: true,
    },
    delFlag: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "small",
    },
    selfStyle: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    FileIcon,
    FileTitle,
  },
  data() {
    return {
      percent: 0,
      delFlagAsync: this.delFlag,
      fileId: "",
      selfStyleData: null,
    };
  },
  methods: {
    deleteClickHandle() {
      this.$emit("deleteFileHanppened", this.file);
    },
    fileTitleChangedHandle(e) {
      // console.log(e);
      this.helper.changeFileTitle(e);
    },
  },
  mounted() {
    // console.log(this.file);
    this.selfStyleData = this.selfStyle;
  },
  watch: {
    "file.percent": {
      handler(newVal) {
        this.$set(this, "percent", newVal);
        // console.log(typeof newVal);
        if (newVal === 100) {
          const name = this.file.filename;
          this.fileId = this.helper.fileIdList[name];
          // console.log(this.helper.fileIdList[name]);
        }
      },
      immediate: true,
      deep: true,
    },
    selfStyle: {
      handler(newVal) {
        if (newVal) {
          this.selfStyleData = newVal;
        }
      },
      immediate: true,
      deep: true,
    },
    delFlag(newVal) {
      this.delFlagAsync = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.pointer {
  cursor: pointer;
}
.mag-t-4 {
  margin-top: 4px;
}
.mag-t-5 {
  margin-top: 5px;
}
.mag-t-12 {
  margin-top: 12px;
}
.mag-t-20 {
  margin-top: 20px;
}
.mag-l-30 {
  margin-left: 30px;
}
/deep/ .ami-progress-bar__outer {
  background-color: #eef3ff;
}
.fileItem {
  display: flex;
  justify-content: space-between;
  height: 42px;
  background: #ffffff;
  border: 1px solid #dee0e6;
  border-radius: 4px;
}
</style>

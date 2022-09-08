<!----------------------------------------------------------------------------
 @description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="FileTitle">
    <div class="file-title pointer" v-on:dblclick="doubleClickHandle" v-if="!isEdit">{{ title }}</div>
    <ami-input
      class="title-input"
      size="small"
      v-model="title"
      placeholder="请输入内容"
      v-else
      @change="mouseEnterHandle"
      @click="clickHandle"
    ></ami-input>
  </div>
</template>

<script>
import { updateFileName } from "./api/index";
export default {
  name: "FileTitle",
  props: {
    file: {
      type: Object,
      default: () => {},
    },
    fileId: {
      type: String,
      default: "",
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      title: this.file.filename,
      isEdit: false,
      fileIdCache: "",
      percentData: 0,
    };
  },
  methods: {
    updateFileName(formData) {
      updateFileName(formData).then(
        (res) => {
          if (res.status === 200) {
            this.isEdit = false;
            this.$emit("fileTitleChanged", {
              oldName: this.file.filename,
              newName: this.title,
              fileId: this.fileIdCache,
            });
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    doubleClickHandle() {
      if (this.percentData === 100) {
        this.isEdit = true;
      }
    },
    mouseEnterHandle() {
      const form = {
        fileId: this.fileIdCache,
        fileName: this.title,
      };
      this.updateFileName(form);
    },
    clickHandle(e) {
      this.$emit("fileTitleClicked", e);
    },
  },
  mounted() {
    this.fileIdCache = this.fileId;
    // console.log(this.file);
  },
  watch: {
    fileId(newVal) {
      if (newVal) {
        this.fileIdCache = this.fileId;
      }
      //   console.log(newVal);
    },
    percent(newVal) {
      if (newVal) {
        this.percentData = newVal;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.FileTitle {
  height: 100%;
  .pointer {
    cursor: pointer;
  }
  .file-title {
    height: 100%;
    // margin-top: 8px;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    // line-height: 16px;
    color: #666666;
    overflow: hidden;
  }
  .file-title:hover {
    color: #0040d1;
    text-shadow: -1px 1px 3px #dee0e6;
  }
  /deep/ .title-input input {
    height: 25px;
  }
}
</style>

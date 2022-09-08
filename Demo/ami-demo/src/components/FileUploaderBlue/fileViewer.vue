<!----------------------------------------------------------------------------
 @description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="fileViewer">
    <ami-row>
      <ami-col :span="3" style="padding-top: 8px">
        <!-- <img src="./assets/file-icon.png" alt="" /> -->
        <FileIcon :type="file.type" />
      </ami-col>
      <ami-col :span="18">
        <div class="file-title" @click="clickHandle">{{ file.fullName }}</div>
      </ami-col>
      <ami-col :span="3">
        <img
          :disabled="delFlagAsync"
          src="./assets/delete.png"
          class="delete-img"
          @click="deleteClickHandle()"
          alt=""
        />
      </ami-col>
    </ami-row>
  </div>
</template>

<script>
import FileIcon from "./fileIcon";
export default {
  name: "fileViewer",
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    FileIcon,
  },
  data() {
    return {
      delFlagAsync: this.file.delFlag,
    };
  },
  methods: {
    deleteClickHandle() {
      this.delFlagAsync = true;
      this.$emit("deleteFileHanppened", this.file);
    },
    clickHandle(e) {
      this.$emit("fileTitleClicked", e);
    },
  },
  watch: {
    "file.delFlag": {
      handler(newVal) {
        // console.log(newVal);
        this.delFlagAsync = newVal;
      },
      immediate: true,
      deep: true,
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
.fileViewer {
  background: #ffffff;
  border: 1px solid #dee0e6;
  border-radius: 4px;
  height: 42px;

  .file-title {
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #666666;
    overflow: hidden;
    height: 42px;
    line-height: 42px;
  }
  .close-img {
    width: 16px;
    height: 16px;
    margin-top: 13px;
    margin-left: 12px;
    cursor: pointer;
  }
  .delete-img {
    width: 16px;
    height: 16px;
    margin-top: 13px;
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>

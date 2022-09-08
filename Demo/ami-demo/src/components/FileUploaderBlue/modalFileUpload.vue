<!----------------------------------------------------------------------------
 @description：大文件上传使用demo
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="modalFileUpload">
    <UploadSection :config="config" />
    <div class="file-list mag-t-20">
      <!-- <FileItem
        v-on="$listeners"
        class="mag-t-12"
        v-for="(file, index) in helper.fileList"
        :key="'file_' + index"
        :file="file"
        :delFlag="helper.uploadStatus !== 's' || helper.delImgBtnFlag || file.isDelServerFile"
        @deleteFileHanppened="helper.delFile(file)"
      /> -->
      <FileItemV2
        v-on="$listeners"
        class="mag-t-12"
        v-for="(file, index) in helper.fileList"
        :key="'file_' + index"
        :file="file"
        :delFlag="helper.uploadStatus !== 's' || helper.delImgBtnFlag || file.isDelServerFile"
        :selfStyle="selfStyle"
        @deleteFileHanppened="helper.delFile(file)"
        @fileTitleChanged="fileTitleChangedHandle"
      />
    </div>
  </div>
</template>

<script>
import { IFileConfigBlue } from "./IFileConfigBlue";
import UploadHelper from "./uploadHelper";
// import FileItem from "./fileItem";
import FileItemV2 from "./fileItemV2";
import UploadSection from "./uploadSection";
const defaultStyle = {
  iconContainer: `width: 11%; paddingTop: 9px`,
  icon: ``,
  progressContainer: `width: 80%`,
  fileTitle: `height: 40%; marginTop: 9px;`,
  fileTitleSuccess: `height: 100%;lineHeight: 42px;`,
  progress: `marginTop: 4px`,
  deleteContainer: "width: 9%",
  deleteIcon: "width: 16px;height: 16px;marginTop: 13px;marginLeft: 12px;cursor: pointer;",
};
export default {
  name: "modalFileUpload",
  props: {
    config: {
      type: IFileConfigBlue,
      default: () => {},
    },
  },
  provide() {
    return {
      helper: this.helper,
    };
  },
  components: {
    // FileItem,
    FileItemV2,
    UploadSection,
  },
  data() {
    return {
      fileDom: null,
      helper: new UploadHelper(),
      selfStyle: defaultStyle,
    };
  },
  methods: {
    fileTitleChangedHandle(e) {
      // console.log(e);
      this.helper.changeFileTitle(e);
    },
  },
  created() {
    this.helper.loadDepencies(this.config);
    const emit = (key, value) => {
      this.$emit(key, value);
    };
    this.helper.$emit = emit;
  },
  mounted() {},
  watch: {
    "helper.uploadStatus": {
      handler(newVal) {
        // console.log(newVal);
        this.$emit("UploadStatusChange", newVal);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.modalFileUpload {
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
  .file-list {
  }
}
</style>

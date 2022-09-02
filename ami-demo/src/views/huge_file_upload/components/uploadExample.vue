<template>
  <div class="uploadExample">
    <UploadSection :config="config" :type="'large'" @fileChosen="fileChosen" />
    <div class="file-list mag-t-20">
      <!-- <FileItem
        v-on="$listeners"
        style="display: inline-block; width: 49.5%"
        class="mag-t-12"
        v-for="(file, index) in helper.fileList"
        :class="{ 'mag-l-10': index % 2 === 1 }"
        :key="'file_' + index"
        :type="'middle'"
        :file="file"
        :delFlag="helper.uploadStatus !== 's' || helper.delImgBtnFlag || file.isDelServerFile"
        @deleteFileHanppened="helper.delFile(file)"
      /> -->
      <ami-row>
        <ami-col :span="12" v-for="(file, index) in helper.fileList" :key="'file_' + index">
          <FileItemV2
            v-on="$listeners"
            class="mag-t-12"
            :class="{ 'mag-l-10': index % 2 === 1 }"
            :file="file"
            :delFlag="helper.uploadStatus !== 's' || helper.delImgBtnFlag || file.isDelServerFile"
            :selfStyle="selfStyle"
            @deleteFileHanppened="helper.delFile(file)"
            @fileTitleChanged="fileTitleChangedHandle"
          />
        </ami-col>
      </ami-row>
    </div>
  </div>
</template>

<script>
import { IFileConfigBlue } from "@/components/FileUploaderBlue/IFileConfigBlue";
import UploadHelper from "@/components/FileUploaderBlue/uploadHelper";
// import FileItem from "@/components/FileUploaderBlue/fileItem";
import FileItemV2 from "@/components/FileUploaderBlue/fileItemV2";
import UploadSection from "@/components/FileUploaderBlue/uploadSection";
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
  name: "uploadExample",
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
    fileChosen(e) {
      console.log(e);
    },
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
    const on = (key, value) => {
      this.$on(key, value);
    };
    this.helper.$on = on;
    this.helper.watchEvent();
    // const message = (msg) => {
    //   this.$message(msg);
    // };
    // this.helper.$message = message;
  },
  mounted() {},
  //   watch: {
  //     "helper.uploadStatus": {
  //       handler(newVal) {
  //         // console.log(newVal);
  //         this.$emit("UploadStatusChange", newVal);
  //       },
  //       immediate: true,
  //       deep: true,
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.uploadExample {
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
  .mag-l-20 {
    margin-left: 20px;
  }
  .mag-l-10 {
    margin-left: 10px;
  }
  .file-list {
  }
}
</style>

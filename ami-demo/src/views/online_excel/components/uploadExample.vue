<template>
  <div class="uploadExample">
    <UploadSection :config="config" :type="'large'" @fileChosen="fileChosen" />
    <div class="file-list mag-t-20">
      <FileItem
        style="display: inline-block; width: 49.5%"
        class="mag-t-12"
        v-for="(file, index) in helper.fileList"
        :class="{ 'mag-l-10': index % 2 === 1 }"
        :key="'file_' + index"
        :type="'middle'"
        :file="file"
        :delFlag="helper.uploadStatus !== 's' || helper.delImgBtnFlag || file.isDelServerFile"
        @deleteFileHanppened="helper.delFile(file)"
      />
    </div>
  </div>
</template>

<script>
import { IFileConfigBlue } from "@/components/FileUploaderBlue/IFileConfigBlue";
import UploadHelper from "@/components/FileUploaderBlue/uploadHelper";
import FileItem from "@/components/FileUploaderBlue/fileItem";
import UploadSection from "@/components/FileUploaderBlue/uploadSection";
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
    FileItem,
    UploadSection,
  },
  data() {
    return {
      fileDom: null,
      helper: new UploadHelper(),
    };
  },
  methods: {
    fileChosen(e) {
      console.log(e);
    },
  },
  created() {
    this.helper.loadDepencies(this.config);
    const emit = (key, value) => {
      this.$emit(key, value);
    };
    this.helper.$emit = emit;
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

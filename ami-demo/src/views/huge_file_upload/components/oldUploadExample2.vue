<template>
  <div class="oldUploadExample2">
    <div style="width: 350px">
      <FileUploader
        :config="config1"
        @fileUploadFinished="fileUploadFinishedHandle1"
        @fileDeleteFinished="fileDeleteFinishedHandle1"
        ref="fileUploader1"
      />
    </div>
    <ami-button type="primary" @click="clear">重置</ami-button>
  </div>
</template>

<script>
import { IFileConfig } from "@/components/FileUploader/IFileConfig";
import FileUploader from "@/components/FileUploader";
const config1 = new IFileConfig();
config1.domId = "file1";
config1.isMultiple = true;
config1.sliceLength = 1024 * 1024 * 2;
export default {
  name: "oldUploadExample2",
  components: {
    FileUploader,
  },
  data() {
    return {
      config1: config1,
    };
  },
  methods: {
    // demo 2
    fileUploadFinishedHandle1(e) {
      console.log(e);
    },
    fileDeleteFinishedHandle1(e) {
      console.log(e);
    },
    clear() {
      this.$refs.fileUploader1.clear();
    },
  },
  mounted() {
    // console.log(this.$refs.fileUploader1.fileList);
    setTimeout(() => {
      config1.viewList = [{ name: "SQL", fileId: "529737177535107072" }];
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.oldUploadExample2 {
  .mag-t-12 {
    margin-top: 12px;
  }
  .mag-l-20 {
    margin-left: 20px;
  }
}
</style>

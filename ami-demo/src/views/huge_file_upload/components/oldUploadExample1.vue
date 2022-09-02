<template>
  <div class="oldUploadExample1">
    <div style="width: 350px">
      <FileUploader
        :config="config"
        @fileUploadFinished="fileUploadFinishedHandle"
        @fileDeleteFinished="fileDeleteFinishedHandle"
        ref="fileUploader2"
        @fileChosen="fileChosenHandle"
      />
    </div>
  </div>
</template>

<script>
import FileUploader from "@/components/FileUploader";
import { IFileConfig } from "@/components/FileUploader/IFileConfig";
const config = new IFileConfig();
config.domId = "file";
config.isMultiple = true;
config.sliceLength = 1024 * 1024 * 2;

export default {
  name: "oldUploadExample1",
  components: {
    FileUploader,
  },
  data() {
    return {
      config: config,
    };
  },
  methods: {
    // demo 1
    fileUploadFinishedHandle(e) {
      console.log(e);
    },
    fileDeleteFinishedHandle(e) {
      console.log(e);
    },
    fileChosenHandle(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.oldUploadExample1 {
  .mag-t-12 {
    margin-top: 12px;
  }
  .mag-l-20 {
    margin-left: 20px;
  }
}
</style>

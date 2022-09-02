<template>
  <div class="uploadCommonExample">
    <UploadExample
      ref="uploadExample"
      :config="configBlue2"
      @fileUploadFinished="fileUploadFinishedHandle3"
      @fileTitleChanged="fileTitleChangedHandle"
      @fileDeleteFinished="fileDeleteFinishedHanlde"
    />
    <div>
      <FileViewer
        v-for="(file, index) in viewerList"
        :key="'file_viewer2_' + index"
        :file="file"
        style="display: inline-block; width: 24%"
        :class="{ 'mag-l-20': index > 0 }"
        @deleteFileHanppened="viewerDeleteFile"
      />
    </div>
  </div>
</template>

<script>
import UploadExample from "./uploadExample";
import FileViewer from "@/components/FileUploaderBlue/fileViewer";
import { IFileViewerBlue } from "@/components/FileUploaderBlue/IFileViewerBlue";
import { IFileConfigBlue } from "@/components/FileUploaderBlue/IFileConfigBlue";
import { deepClone } from "@/utils/util";
const configBlue2 = new IFileConfigBlue();
configBlue2.sliceLength = 1024 * 1024 * 20;
configBlue2.isMultiple = true;
export default {
  name: "uploadCommonExample",
  components: {
    FileViewer,
    UploadExample,
  },
  data() {
    return {
      dialogFormVisible: false,
      configBlue2: configBlue2,
      titleIcon: false,
      uploadStatus: "n",
      uploadedFileList: [],
      viewerList: [],
    };
  },
  methods: {
    // demo4
    fileUploadFinishedHandle3(e) {
      console.log(e);
      if (e && e.length) {
        for (const iterator of e) {
          const source = iterator.data.data;
          const t = new IFileViewerBlue();
          // 常见的文件类型
          // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          // "application/vnd.ms-excel"
          // "application/zip"
          // "application/pdf"
          // "application/msword"
          // "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          // "video/mp4"
          // "application/x-rar-compressed"
          // "application/json"
          // "image/svg+xml"
          // "image/png"
          // "text/csv"
          // "application/vnd.ms-powerpoint"
          // "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          // "text/html"
          // "text/plain"
          // "application/vnd.noblenet-directory"
          // "application/vnd.android.package-archive"
          // "application/octet-stream"
          // "audio/mpeg"
          // 这里我就不处理了，大家根据自己的展示的文件类型处理一下
          // 如果不知道怎么处理可以来找我、张时友
          t.type = "text/plain";
          t.delFlag = false;
          t.fileId = source.fileId;
          t.fullName = source.fullName;
          this.viewerList.push(t);
        }
        // console.log(this.viewerList);
      }
    },
    viewerDeleteFile(e) {
      this.$refs.uploadExample.helper.deleteFileFromViewer(e).then(
        () => {
          this.viewerList = this.viewerList.filter((item) => item.fileId !== e.fileId);
        },
        (err) => {
          console.log(err);
          e.delFlag = false;
          this.$message({
            message: `文件删除失败`,
            type: "warning",
            duration: 2000,
          });
        }
      );
    },
    fileTitleChangedHandle(e) {
      console.log(e);
      const t = deepClone(this.viewerList);
      const index = t.findIndex((item) => item.fileId === e.fileId);
      if (index > -1) {
        t[index].fileName = e.newName.split(".")[0];
        t[index].fullName = e.newName;
        this.viewerList = t;
      }
    },
    fileDeleteFinishedHanlde(e) {
      console.log(e);
      this.viewerList = this.viewerList.filter((item) => item.fileId !== e.fileId);
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadCommonExample {
}
</style>

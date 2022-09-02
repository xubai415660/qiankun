<template>
  <div class="uploadModalExample">
    <ami-button type="primary" @click="dialogFormVisible = true">上传</ami-button>
    <ami-dialog :visible.sync="dialogFormVisible" :titleIcon="titleIcon" width="480px">
      <ModalFileUpload
        ref="modalUploader"
        :config="configBlue"
        @UploadStatusChange="uploadStatusChange"
        @fileUploadFinished="fileUploadFinishedHandle2"
        @fileDeleteFinished="fileDeleteFinishedHanlde"
        @fileTitleChanged="fileTitleChangedHandle2"
      />
      <div slot="footer" class="dialog-footer">
        <ami-button type="primary" :loading="true" v-if="uploadStatus === 'u'">上传中</ami-button>
        <ami-button type="primary" @click="reUpload()" v-if="uploadStatus === 'f'">断点续传</ami-button>
        <ami-button @click="cancel" v-if="uploadStatus !== 'u' && uploadStatus !== 'f'">取 消</ami-button>
        <ami-button type="primary" @click="confirm" v-if="uploadStatus !== 'u' && uploadStatus !== 'f'"
          >确 定</ami-button
        >
      </div>
    </ami-dialog>
    <div class="fileList mag-t-12">
      <FileViewer
        v-for="(file, index) in uploadedFileList"
        :key="'file_viewer_' + index"
        :file="file"
        style="display: inline-block; width: 24%"
        :class="{ 'mag-l-20': index > 0 }"
        @deleteFileHanppened="deleteFile"
      />
    </div>
  </div>
</template>

<script>
import ModalFileUpload from "@/components/FileUploaderBlue/modalFileUpload";
import { IFileConfigBlue } from "@/components/FileUploaderBlue/IFileConfigBlue";
import FileViewer from "@/components/FileUploaderBlue/fileViewer";
import { deepClone } from "@/utils/util";
const configBlue = new IFileConfigBlue();
configBlue.isMultiple = true;
export default {
  name: "uploadModalExample",
  components: {
    ModalFileUpload,
    FileViewer,
  },
  data() {
    return {
      dialogFormVisible: false,
      configBlue: configBlue,
      titleIcon: false,
      uploadStatus: "n",
      uploadedFileList: [],
      viewerList: [],
    };
  },
  methods: {
    // demo 3
    uploadStatusChange(e) {
      // console.log(e);
      this.uploadStatus = e;
    },
    reUpload() {
      this.$refs.modalUploader.helper.reUpload();
    },
    fileUploadFinishedHandle2(e) {
      console.log(e);
      if (e && e.length) {
        for (const file of e) {
          const f = deepClone(file.data.data);
          f.delFlag = false;
          this.uploadedFileList.push(f);
        }
      }
    },
    fileDeleteFinishedHanlde(e) {
      // console.log(e);
      // console.log(this.uploadedFileList);
      this.uploadedFileList = this.uploadedFileList.filter((item) => item.fileId !== e.fileId);
      // console.log(this.uploadedFileList);
    },
    fileTitleChangedHandle2(e) {
      // console.log(e);
      const t = deepClone(this.uploadedFileList);
      const index = t.findIndex((item) => item.fileId === e.fileId);
      if (index > -1) {
        t[index].fileName = e.newName.split(".")[0];
        t[index].fullName = e.newName;
        this.uploadedFileList = t;
      }
      // console.log(this.uploadedFileList);
    },
    deleteFile(e) {
      // console.log(e);
      // const that = this;
      this.$refs.modalUploader.helper.deleteFileFromViewList(e.fileId).then(
        () => {
          this.uploadedFileList = this.uploadedFileList.filter((item) => item.fileId !== e.fileId);
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
    confirm() {
      // const list = this.$refs.modalUploader.helper.fileList;
      this.dialogFormVisible = false;
      this.$refs.modalUploader.helper.clear();
    },
    cancel() {
      this.dialogFormVisible = false;
      this.$refs.modalUploader.helper.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadModalExample {
  .mag-t-12 {
    margin-top: 12px;
  }
  .mag-l-20 {
    margin-left: 20px;
  }
}
</style>

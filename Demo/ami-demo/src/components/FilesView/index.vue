<!-- --------------------------------------------------------
 @description：文件预览
 @author：张时友
 @date：Created in   2022/6/18 14:57
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <ami-dialog
    :title="fileName"
    :titleIcon="false"
    :visible.sync="visible"
    width="960px"
    :before-close="beforeClose"
    :destroy-on-close="true"
    :append-to-body="appendToBody"
  >
    <div v-if="type === 'mp4'" style="width: 100%; height: 100%">
      <ami-video style="width: 100%" :src="url"> </ami-video>
    </div>
    <div class="files-view-box" v-else-if="type === 'xlsx'" v-loading="loading">
      <ami-online-excel
        style="height: 100%; width: 100%"
        ref="online"
        :file="file"
        @get-data="getData"
        :allowEdit="allowEdit"
        :id="id"
      >
        <!--       -->
      </ami-online-excel>
    </div>
    <div v-else class="files-view-box" v-loading="loading">
      <pdf ref="pdf" :src="files" v-for="i in pages" :key="i" :page="i"></pdf>
    </div>
  </ami-dialog>
</template>
<script>
import { downLoadFile, onlinePreview, addOrUpdExcel } from "@/api/public/public";
const moduleId = require("../../../package.json").moduleId.toLowerCase();
import pdf from "vue-pdf";
export default {
  name: "FilesView",
  components: {
    pdf,
  },
  props: {
    /**
     * 是否显示 Dialog
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否可编辑（只有xlsx可编辑）
     */
    allowEdit: {
      type: Boolean,
      default: false,
    },
    /**
     * 文件id
     */
    fileId: {
      required: true,
      type: String,
    },
    /**
     * 文件类型（文件后缀）
     */
    fileType: {
      required: true,
      type: String,
    },
    /**
     * 文件名（不带后缀）
     */
    fileName: {
      required: true,
      type: String,
    },
    /**
     * 弹窗套弹窗
     */
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: moduleId + "-online-excel",
      files: "",
      pdfDoc: null,
      pages: null,
      loading: false,
      file: {},
      type: "",
      url: "",
      videoType: [
        "video/mp4",
        "video/3gp",
        "video/webm",
        "video/ogg",
        "avi",
        "wmv",
        "mpeg",
        "mp4",
        "m4v",
        "mov",
        "asf",
        "flv",
        "f4v",
        "rmvb",
        "rm",
        "3gp",
        "vob",
      ],
    };
  },
  computed: {
    change() {
      const { allowEdit, fileId, visible } = this;
      return {
        allowEdit,
        fileId,
        visible,
      };
    },
  },
  watch: {
    change() {
      if (this.visible) {
        this.init();
      }
    },
  },
  methods: {
    init() {
      this.loading = true;
      console.log(this.fileType);
      if (this.videoType.includes(this.fileType)) {
        this.type = "mp4";
        const domain = window.location.origin;
        this.url = domain + "/ami/ma01-02-056/minio-file/previewVideo?fileId=" + this.fileId;
        this.loading = false;
      } else if (this.fileType === "xlsx") {
        this.type = "xlsx";
        downLoadFile({
          fileId: this.fileId,
          fileName: this.fileName,
          fileType: this.fileType,
        })
          .then((res) => {
            this.loading = false;
            const fileBlob = new Blob([res.data], { type: "application/xlsx" });
            this.file.raw = window.URL.createObjectURL(fileBlob);
            this.file.name = this.fileName + "." + this.fileType;
            this.$nextTick(() => {
              // 展现表格数据
              this.$refs.online.onlineFilePreview();
            });
          })
          .catch(() => {
            this.$message({
              message: "文件加载失败",
              type: "warning",
            });
            this.loading = false;
          });
      } else {
        this.type = "pdf";
        onlinePreview({
          fileIdVo: this.fileId,
          fileType: this.fileType,
        })
          .then((res) => {
            this.loading = false;
            let fileBlob = new Blob([res.data], { type: "application/pdf" });
            this.files = window.URL.createObjectURL(fileBlob);
            this.loadFile(this.files);
          })
          .catch(() => {
            this.$message({
              message: "文件加载失败",
              type: "warning",
            });
            this.loading = false;
          });
      }
    },
    loadFile() {
      let loadingTask = pdf.createLoadingTask(this.files);
      loadingTask.promise
        .then((pdf) => {
          this.pages = pdf.numPages;
        })
        .catch(() => {
          this.$message({
            message: "文件加载失败",
            type: "warning",
          });
        });
    },
    getData(val) {
      let newFormData = new FormData();
      newFormData.append("fileId", this.fileId);
      newFormData.append("fileType", this.fileType);
      newFormData.append("fileName", this.fileName + "." + this.fileType);
      newFormData.append("wb", JSON.stringify(val));
      addOrUpdExcel(newFormData)
        .then(() => {
          this.$message({
            message: "数据保存成功！",
            type: "success",
          });
          this.beforeClose();
        })
        .catch(() => {
          this.$message({
            message: "数据保存失败！",
            type: "warning",
          });
          this.loading = false;
        });
    },
    beforeClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="scss">
.files-view-box {
  height: 600px;
  overflow-y: auto;
}
</style>

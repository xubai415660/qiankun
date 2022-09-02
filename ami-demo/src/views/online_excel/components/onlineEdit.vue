<!--
 * @Description: 在线编辑模板 - onlineEdit
 * @Author: 孙潇逸
 * @Date: 2022-05-17 10:08:19
 * @Modified By:
 * @Version: 1.0.0
-->
<template>
  <ami-dialog
    title="在线编辑模板"
    :visible.sync="onlineExcelDialog"
    :before-close="handleClose"
    width="70%"
    height="250px"
  >
    <div style="width: 100%; height: 100%">
      <ami-online-excel style="height: 500px; width: 100%" ref="online" :file="file" @get-data="getData">
      </ami-online-excel>
    </div>
  </ami-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { downLoadFile, addOrUpdExcel } from "@/api/dome/dome";
export default {
  computed: {
    ...mapGetters({
      onlineExcelDialog: "template/onlineExcelDialog",
      onlineExcelFileData: "template/onlineExcelFileData",
    }),
  },
  data() {
    return {
      file: {
        name: "",
        raw: null,
      },
    };
  },
  mounted() {
    this.getExcel();
  },
  methods: {
    ...mapMutations({ SET_ONLINE_EXCEL_DIALOG: "template/SET_ONLINE_EXCEL_DIALOG" }),
    // 关闭弹窗
    handleClose() {
      this.SET_ONLINE_EXCEL_DIALOG(false);
    },
    getExcel() {
      let that = this;
      that.file.name = that.onlineExcelFileData.fullName;
      // 调用下载文件接口
      console.log(this.onlineExcelFileData.fileId, "获取文件相关的数据");
      downLoadFile({ fileId: this.onlineExcelFileData.fileId, fileName: this.onlineExcelFileData.fileName })
        .then((res) => {
          console.log(res);
          const fileBlob = new Blob([res.data], { type: "application/xlsx" });
          that.file.raw = window.URL.createObjectURL(fileBlob);
          that.$nextTick(() => {
            // 展现表格数据
            console.log(that.$refs.online);
            that.$refs.online.onlineFilePreview();
          });
        })
        .catch(() => {
          that.$message.error("excel预览失败！");
        });
    },
    getData(data) {
      console.log(JSON.stringify(data));
      let params = {
        fileId: this.onlineExcelFileData.fileId,
        fileName: this.onlineExcelFileData.fileName,
        wb: JSON.stringify(data),
      };
      addOrUpdExcel(params).then((res) => {
        console.log(res);
        // this.handleClose();
      });
    },
  },
};
</script>

<style></style>

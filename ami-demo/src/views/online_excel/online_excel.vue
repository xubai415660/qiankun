<!-- --------------------------------------------------------
 @description：excel预览
 @author：张时友
 @date：Created in   2022/5/26 19:39
 @modified By：
 @version: 1.0.0
 ------------------------------------------------------------ -->
<template>
  <div class="index">
    <UploadExample :config="configBlue" @fileUploadFinished="fileUploadFinishedHandle" />
    <ami-button type="primary" @click="preview">excel预览</ami-button>
    <OnlinePreview ref="onlinePreview" v-if="onlineExcelDialog" />
    <p>{{ num }}</p>
    <ami-button @click="getData">获取remoteStore数据</ami-button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import OnlinePreview from "./components/onlineEdit";
import UploadExample from "./components/uploadExample";
import { IFileConfigBlue } from "_c/FileUploaderBlue/IFileConfigBlue";
import { remoteStore } from "@/utils/remoteUtil";
const configBlue = new IFileConfigBlue();
configBlue.fileAccept = ".xlsx";
configBlue.reminder = "只支持预览xlsx格式文件";
export default {
  name: "index",
  components: {
    UploadExample,
    OnlinePreview,
  },
  data() {
    return {
      configBlue: configBlue,
      num: remoteStore.get("mf0100999"),
    };
  },
  computed: {
    ...mapGetters({
      onlineExcelDialog: "template/onlineExcelDialog",
      onlineExcelFileData: "template/onlineExcelFileData",
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations({
      SET_ONLINE_EXCEL_DIALOG: "template/SET_ONLINE_EXCEL_DIALOG",
      SET_ON_LINE_EXCEL_FILE_DATA: "template/SET_ON_LINE_EXCEL_FILE_DATA",
    }),
    preview() {
      this.SET_ONLINE_EXCEL_DIALOG(true);
    },
    // 文件上传
    fileUploadFinishedHandle(e) {
      let data = e[0].data.data;
      console.log(data, "文件上传的数据");
      if (data === "") return; // 根据返回attNo在调用下载接口，通过文件流展示图片
      this.SET_ON_LINE_EXCEL_FILE_DATA(data);
    },
    getData() {
      this.num = remoteStore.get("mf0100999");
    },
  },
};
</script>

<style scoped lang="scss">
.index {
}
</style>

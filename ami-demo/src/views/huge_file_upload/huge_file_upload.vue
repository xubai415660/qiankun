<!--
 * @description: 
 * @author: 王浩
 * @Date: 2022-06-01 14:22:26
 * @Modified By: 
 * @version: 1.0.0
-->
<!----------------------------------------------------------------------------
 @description：大文件上传使用demo
 @author：宋乾
 @date：Created in  2022/2/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="hugeFileUpload" style="width: 80%; height: 100%; overflow-y: auto; margin: 0 auto; padding-bottom: 100px">
    <h2>Demo 1: 文件上传组件弹窗的常规使用 (新的组件)</h2>
    <UploadModalExample />

    <h2>Demo 2: 文件上传组件常规使用 (新的组件)</h2>
    <UploadCommonExample />

    <!-- <div style="width: 50%">
      <FileItemV2 :file="file" :selfStyle="selfStyle" />
    </div> -->

    <h3>常见MIME类型和文件后缀对照</h3>
    <MimeType />
  </div>
</template>

<script>
import UploadModalExample from "./components/uploadModalExample";
import UploadCommonExample from "./components/uploadCommonExample";
import MimeType from "./components/mimeType";
// import FileItemV2 from "@/components/FileUploaderBlue/fileItemV2"
// const defaultStyle = {
//   iconContainer: `width: 11%; paddingTop: 9px`,
//   icon: ``,
//   progressContainer: `width: 80%`,
//   fileTitle: `height: 40%; marginTop: 9px;`,
//   fileTitleSuccess: `height: 100%;lineHeight: 42px;`,
//   progress: `marginTop: 4px`,
//   deleteContainer: "width: 9%",
//   deleteIcon: "width: 16px;height: 16px;marginTop: 13px;marginLeft: 12px;cursor: pointer;",
// };

export default {
  name: "HugeFileUpload",
  components: {
    UploadModalExample,
    UploadCommonExample,
    MimeType,
    // FileItemV2
  },
  data() {
    return {
      file: {
        filename: `12222222222.txt`,
        percent: 50,
      },
      // selfStyle: defaultStyle
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.hugeFileUpload {
  .mag-t-12 {
    margin-top: 12px;
  }
  .mag-l-20 {
    margin-left: 20px;
  }
  .fileList {
  }
}
</style>

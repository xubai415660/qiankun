<!----------------------------------------------------------------------------
 @description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div class="fileIcon">
    <ami-svg-icon :name="mapping[type]"></ami-svg-icon>
  </div>
</template>

<script>
const Mapping = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "ami-icon-svg-excel",
  "application/vnd.ms-excel": "ami-icon-svg-excel",
  "application/zip": "ami-icon-svg-zip",
  "application/pdf": "ami-icon-svg-pdf",
  "application/msword": "ami-icon-svg-word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "ami-icon-svg-word",
  "video/mp4": "ami-icon-svg-mp4",
  "application/x-rar-compressed": "ami-icon-svg-rar",
  "application/json": "ami-icon-svg-json",
  "image/svg+xml": "ami-icon-svg-svg",
  "image/png": "ami-icon-svg-PNG",
  "text/csv": "ami-icon-svg-csv",
  "application/vnd.ms-powerpoint": "ami-icon-svg-ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "ami-icon-svg-ppt",
  "text/html": "ami-icon-svg-web-page",
  "text/plain": "ami-icon-svg-txt",
  "application/vnd.noblenet-directory": "ami-icon-svg-file",
  "application/vnd.android.package-archive": "ami-icon-svg-apk",
  "application/octet-stream": "ami-icon-svg-exe",
  "audio/mpeg": "ami-icon-svg-mp3",
};
export default {
  name: "fileIcon",
  props: {
    type: {
      type: String,
      default: "text/plain",
    },
  },
  data() {
    return {
      mapping: Mapping,
    };
  },
};
</script>

<style lang="scss" scoped>
.fileIcon {
  // /deep/ .ami-svg-icon__svg {
  //   width: 1.5em;
  //   height: 1.8em;
  //   vertical-align: -0.15em;
  //   fill: currentColor;
  //   overflow: hidden;
  // }
  .ami-svg-icon {
    height: 24px;
  }
}
</style>

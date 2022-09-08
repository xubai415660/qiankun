<!----------------------------------------------------------------------------
 @description：大文件上传使用demo
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->
<template>
  <div
    class="uploadSection"
    :class="{ small: type === 'small', middle: type === 'middle', large: type === 'large' }"
    :id="config.dragAreaDomId"
  >
    <template v-if="type === 'small'">
      <div style="padding: 24px 0 13px 0">
        <img src="./assets/upload.png" alt="" />
      </div>
      <p class="reminder-1" style="text-align: center">
        点我<a class="reminder-2 pointer" @click="openFileWindow()">上传文件</a>，或把文件拖入此处上传
      </p>
      <p class="reminder-1 mag-t-5" style="text-align: center">{{ config.reminder }}</p>
    </template>
    <template v-if="type === 'large'">
      <p class="reminder-1" style="text-align: center">
        <img style="display: inline; width: 24px; height: 19px" src="./assets/upload.png" alt="" />
        点我<a class="reminder-2 pointer" @click="openFileWindow()">上传文件</a>，或把文件拖入此处上传
      </p>
      <p class="reminder-1 mag-t-10" style="text-align: center">{{ config.reminder }}</p>
    </template>
    <input
      type="file"
      name="file"
      :multiple="config.isMultiple"
      :id="config.domId"
      style="display: none"
      @change="fileChosen"
      :accept="config.fileAccept"
    />
  </div>
</template>

<script>
import { IFileConfigBlue, ComponentMode } from "./IFileConfigBlue";
import UploadHelper from "./uploadHelper";
import { addDragEvent } from "./dragable";
import { deepClone } from "@/utils/util";
export default {
  name: "uploadSection",
  inject: {
    helper: {
      type: UploadHelper,
      default: () => {},
    },
  },
  props: {
    config: {
      type: IFileConfigBlue,
      default: () => {},
    },
    type: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      fileDom: null,
      // modeData: this.mode,
      viewLengthData: this.config.viewLength,
    };
  },
  methods: {
    /**
     * 打开文件选择文件夹
     */
    openFileWindow() {
      this.fileDom.click();
    },
    /**
     * 消息提醒
     */
    msgAlreadyExist(name) {
      this.$message({
        message: `${name}已经存在`,
        type: "warning",
        duration: 2000,
      });
    },
    msgOverSize() {
      this.$message({
        message: `文件数量大于${this.config.isMultiple ? this.config.fileQuantityLimit : 1}`,
        type: "warning",
        duration: 2000,
      });
    },
    msgWrongTypes(wrongTypes) {
      this.$message({
        message: `错误的文件类型：${wrongTypes}`,
        type: "warning",
        duration: 2000,
      });
    },
    /**
     * 检查文件列表长度
     */
    checkFileLen() {
      const len =
        this.config.mode === ComponentMode.edit
          ? this.viewLengthData + this.helper.fileList.length
          : this.helper.fileList.length;
      if (this.config.isMultiple) {
        return len < this.config.fileQuantityLimit;
      } else {
        return len < 1;
      }
    },
    /**
     * 将文件拷贝到内存
     * @param {*} list 文件列表
     */
    copyFileToCache(list) {
      const len = list.length < this.config.fileQuantityLimit + 1 ? list.length : this.config.fileQuantityLimit;
      for (let i = 0; i < len; i++) {
        const f = list[i];
        if (f.size <= this.config.maxFileSize) {
          let blob = deepClone(list[i]);
          // console.log(this.fileDom.files[i]);
          const exist = this.helper.fileList.filter((item) => item.filename === blob.name);
          if (exist && exist.length < 1) {
            if (this.checkFileLen()) {
              this.helper.fileList.push({
                file: blob,
                percent: 0,
                filename: blob.name,
                isDelServerFile: false,
              });
            } else {
              this.msgOverSize();
              break;
            }
          } else {
            setTimeout(() => {
              this.msgAlreadyExist(blob.name);
            }, i * 1000);
          }
        }
      }
    },
    /**
     * 将文件从DOM中拷贝到内存中
     */
    copyFileFromDom(list) {
      if (list && list.length) {
        if (this.checkFileLen()) {
          this.copyFileToCache(list);
        } else {
          this.msgOverSize();
        }
      }
    },
    /**
     * 将拖入的文件拷贝到内存
     * @param {*} list 文件列表
     */
    copyFileFromDrag(list) {
      // console.log(list);
      if (list && list.length) {
        if (this.checkFileLen()) {
          this.copyFileToCache(list);
        } else {
          this.msgOverSize();
        }
      }
    },
    /**
     * 文件选中事件
     */
    fileChosen() {
      if (this.config.sliceLength < 1024 * 1024 * 5) {
        if (this.$message) {
          this.$message({
            message: `文件切片尺寸不能小于5M`,
            type: "warning",
            duration: 2000,
          });
        }
        return;
      }
      // 文件上传时，不可以继续上传文件
      if (this.helper.uploadStatus === "u") {
        return;
      }
      // console.log(this.fileDom.files);
      const t = this.fileTypeHandle(this.fileDom.files);
      if (t.list.length) {
        this.copyFileFromDom(t.list);
        // 变更组件状态 等待上传
        this.uploadStatus = "u";
        this.fileDom.value = "";
        this.helper.uploadHandle();
        // this.$set(this, "fileList", this.helper.fileList);
        this.$emit("fileChosen", this.helper.fileList);
      }
      if (t.wrongTypes.length) {
        this.msgWrongTypes(t.wrongTypes.join(","));
      }
    },
    /**
     * 文件列表处理
     * @param {*} list 文件列表
     */
    fileTypeHandle(list) {
      let res = {
        wrongTypes: [],
        list: [],
      };

      let mimes = this.config.fileAccept.split(",");
      if (mimes && mimes.length) {
        mimes = mimes.map((item) => {
          if (item) {
            item = item.trim();
          }
          return item;
        });
      }

      const checkFileType = (type) => {
        return mimes.indexOf(type) > -1;
      };

      const getMimeByFileExtension = (extension) => {
        const mapping = {
          xls: "application/vnd.ms-excel",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          zip: "application/zip",
          pdf: "application/pdf",
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          mp4: "video/mp4",
          rar: "application/x-rar-compressed",
          json: "application/json",
          svg: "image/svg+xml",
          png: "image/png",
          csv: "text/csv",
          ppt: "pplication/vnd.ms-powerpoint",
          pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          html: "text/html",
          txt: "text/plain",
          apk: "application/vnd.android.package-archive",
          exe: "application/octet-stream",
          mp3: "audio/mpeg",
        };
        let res = "";

        res = mapping[extension];

        return res;
      };

      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const type = element.type || getMimeByFileExtension(element.name.split(".")[1]);
        if (checkFileType(type)) {
          res.list.push(element);
        } else {
          res.wrongTypes.push(type);
        }
      }

      return res;
    },
    /**
     * 文件拖入事件处理
     */
    dragHandle() {
      const target = document.getElementById(this.config.dragAreaDomId);
      if (target) {
        addDragEvent(
          target,
          () => {},
          () => {},
          (e, res) => {
            // console.log(e);
            // console.log(res);
            res.then((a) => {
              if (this.config.sliceLength < 1024 * 1024 * 5) {
                if (this.$message) {
                  this.$message({
                    message: `文件切片尺寸不能小于5M`,
                    type: "warning",
                    duration: 2000,
                  });
                }
                return;
              }
              // console.log(a);
              // 文件上传时，不可以继续上传文件
              if (this.helper.uploadStatus === "u") {
                return;
              }
              // console.log("upload start");
              const t = this.fileTypeHandle(a);
              if (t.list.length) {
                this.copyFileFromDrag(t.list);
                this.helper.uploadHandle();
                // this.$set(this, "fileList", this.helper.fileList);
                this.$emit("fileChosen", this.helper.fileList);
                // console.log(this.helper.fileList, this.helper.fileList.length);
              }
              if (t.wrongTypes.length) {
                this.msgWrongTypes(t.wrongTypes.join(","));
              }
            });
          },
          () => {}
        );
      }
    },
  },
  mounted() {
    this.fileDom = document.getElementById(this.config.domId);
    this.dragHandle();
  },
  watch: {
    "config.viewLength": {
      handler(newVal) {
        this.viewLengthData = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
.mag-t-10 {
  margin-top: 10px;
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
.small {
  height: 138px;
}
.large {
  height: 88px;
  padding-top: 20px;
  border: 1px dashed rgba(0, 64, 209, 0.5);
  border-radius: 4px;
}
.uploadSection {
  width: 100%;
  border-radius: 4px;
  background: rgba(94, 146, 247, 0.05);
  img {
    width: 36px;
    height: 29.14px;
    margin: 0 auto;
  }
  .reminder-1 {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0px;
  }
  .reminder-2 {
    color: #003fd1;
  }
}
</style>

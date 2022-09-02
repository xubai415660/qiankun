<!----------------------------------------------------------------------------
 @description：封装大文件分片上传
 @author：宋乾
 @date：Created in  2022/2/17 09:36
 @modified By：
 @version: 1.0.0
 ---------------------------------------------------------------------------->

<template>
  <div>
    <div class="uploader-container">
      <input
        v-if="config.isMultiple"
        :id="config.domId"
        :accept="config.fileAccept"
        multiple="multiple"
        name="file"
        style="display: none"
        type="file"
        @change="fileChosen"
      />
      <input
        v-else
        :id="config.domId"
        :accept="config.fileAccept"
        name="file"
        style="display: none"
        type="file"
        @change="fileChosen"
      />
      <img
        v-if="uploadStatus === 'n'"
        alt=""
        class="upload-img-btn"
        src="./assets/upload.png"
        @click="openFileWindow()"
      />
      <div v-else class="file-list">
        <ami-row v-for="(item, index) in fileList" :key="'01_' + index" class="file-item">
          <ami-col :span="2">
            <img alt="" src="./assets/uploaded.png" style="width: 16px; height: 16px; margin-top: 13px" />
          </ami-col>
          <ami-col :span="19">
            <div style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden">
              {{ item.file.name }}
            </div>
          </ami-col>
          <ami-col :span="3" style="text-align: right">
            <span v-if="uploadStatus === 'u' || uploadStatus === 'f'">{{ item.percent }}%</span>
            <span v-if="item.isDelServerFile">0%</span>
            <img
              v-if="(uploadStatus === 'w' || uploadStatus === 's') && !item.isDelServerFile && delImgBtnFlag"
              alt=""
              src="./assets/del.png"
              style="width: 15px; height: 16px; margin: 0 auto; margin-top: 13px; cursor: pointer"
              @click="delFile(index, item)"
            />
          </ami-col>
        </ami-row>
      </div>
      <div style="height: 10px">&nbsp;</div>
      <div style="text-align: center">
        <ami-button v-if="uploadStatus === 'u'" :loading="true" type="primary">上传中</ami-button>
        <ami-button
          v-if="uploadStatus === 'n' || uploadStatus === 'w'"
          :disabled="uploadStatus === 'n'"
          type="primary"
          @click="uploadBtnClickHandle()"
          >{{ config.buttonTxt }}
        </ami-button>
        <ami-button v-if="uploadStatus === 'f'" type="primary" @click="reUpload()">断点续传</ami-button>
        <div style="height: 10px">&nbsp;</div>
        <a
          v-if="
            config.isMultiple &&
            fileList.length > 0 &&
            fileList.length < config.fileQuantityLimit &&
            uploadStatus === 'w'
          "
          class="pointer link"
          @click="openFileWindow()"
          >继续选择文件</a
        >
      </div>
      <div style="height: 10px">&nbsp;</div>
      <div style="text-align: center; margin-top: 20px">
        {{ config.reminder }}
      </div>
      <div style="height: 10px">&nbsp;</div>
    </div>
  </div>
</template>

<script>
import { deleteFile, fileSliceUpload, fileUpload, mergeSlice } from "./api";
import { deepClone } from "@/utils/util";
import { IFileConfig } from "./IFileConfig";
import { uuid } from "./uuid";

export default {
  name: "HugeFileUpload",
  props: {
    config: {
      type: IFileConfig,
      default: () => {},
    },
  },
  data() {
    return {
      // DOM相关
      fileIdForData: "",
      fileDom: null,
      fileList: [],
      uploadImgBtnFlag: true,
      maxFileSize: 5,
      // 删除按钮显示标志
      delImgBtnFlag: true,

      // 配置相关
      bytesPerPiece: this.config.sliceLength, // 每个文件切片大小定为5M

      // 上传相关
      taskList: [],
      sliceUrlList: {},
      // 文件切片列表
      fileSliceList: [],
      uploadStatus: "n", // n: 没有选择文件， w: 等待，u：正在上传，f: 任务执行完，但是有失败任务，s: 全部执行成功
      fileIdList: {},
      // 返参
      mergeResult: [],
    };
  },
  methods: {
    openFileWindow() {
      this.fileDom.click();
    },

    fileChosen() {
      //   console.log(e);
      if (this.fileDom.files && this.fileDom.files.length) {
        const len =
          this.fileDom.files.length < this.config.fileQuantityLimit + 1
            ? this.fileDom.files.length
            : this.config.fileQuantityLimit;
        for (let i = 0; i < len; i++) {
          const f = this.fileDom.files[i];
          if (f.size <= this.config.maxFileSize) {
            let blob = deepClone(this.fileDom.files[i]);
            // console.log(this.fileDom.files[i]);
            const exist = this.fileList.filter((item) => item.filename === blob.name);
            if (exist && exist.length < 1) {
              if (this.fileList.length < this.config.fileQuantityLimit) {
                this.fileList.push({
                  file: blob,
                  percent: 0,
                  filename: blob.name,
                  isDelServerFile: false,
                });
              } else {
                console.log(`文件数量大于${this.config.fileQuantityLimit}`);
                this.$message({
                  message: `文件数量大于${this.config.fileQuantityLimit}`,
                  type: "warning",
                  duration: 2000,
                });
              }
            } else {
              console.log(`${blob.name}已经存在`);
              this.$message({
                message: `${blob.name}已经存在`,
                type: "warning",
                duration: 2000,
              });
            }
          }
        }
        //   this.uploadImgBtnFlag = false
        // 变更组件状态 等待上传
        this.uploadStatus = "w";
        this.fileDom.value = "";
        //   console.log(this.fileDom.files);
        this.$emit("fileChosen", this.fileList);
      }
    },

    delFile(index, item) {
      if (this.uploadStatus === "w") {
        this.fileList.splice(index, 1);
        if (this.fileList.length === 0) {
          // this.uploadImgBtnFlag = true;
          // 变更组件状态 没有选择文件
          this.uploadStatus = "n";
        }
      } else {
        //   const formData = new FormData();
        //   formData.append("fileId", this.fileIdList[filename] * 1);
        //   this.deleteFile({fieldId: this.fileIdList[item.filename]}, item)
        this.deleteFile(
          {
            bucketName: "",
            createDate: "",
            creator: "",
            fileId: this.fileIdList[item.filename],
            fileName: "",
            fileSize: 0,
            fileType: "",
            fileUrl: "",
            fullName: "",
          },
          item
        );
      }
    },

    // 删除文件
    deleteFile(formData, fileInfo) {
      fileInfo.isDelServerFile = true;
      deleteFile(formData).then(
        (res) => {
          if (res.status === 200) {
            this.fileList = this.fileList.filter((item) => item.filename !== fileInfo.filename);
            delete this.fileIdList[fileInfo.filename];
            if (this.fileList.length === 0) {
              this.uploadStatus = "n";
            }
            this.$emit("fileDeleteFinished", { fileInfo, res });
          } else {
            console.log(res);
            fileInfo.isDelServerFile = false;
          }
        },
        (err) => {
          console.log(err);
          fileInfo.isDelServerFile = false;
        }
      );
    },

    mergeSlice(fileSliceList, totalPieces, filesize, filename) {
      return new Promise((resolve) => {
        // 回调计数器
        let count = 0;
        for (const item of fileSliceList) {
          if (item.status === "1") {
            count++;
          }
        }

        if (count == totalPieces) {
          console.log("merge happened");
          const param = {
            fileSize: Math.ceil(filesize / 1024),
            fullName: filename,
            sliceList: this.sliceUrlList[filename],
            sliceNum: totalPieces,
          };
          mergeSlice(param).then(
            (res) => {
              if (res.status === 200) {
                // console.log(res);
                resolve(res);
              } else {
                resolve({
                  type: "ErrorOrException",
                  msg: res,
                });
              }
            },
            (err) => {
              // console.log(err);
              resolve({
                type: "ErrorOrException",
                msg: err,
              });
            }
          );
        } else {
          resolve({
            type: "ErrorOrException",
            msg: null,
          });
        }
      });
    },

    fileSliceUpload(formData) {
      return new Promise(function (resolve) {
        fileSliceUpload(formData).then(
          (res) => {
            if (res.status === 200) {
              resolve(res);
            } else {
              resolve({
                type: "ErrorOrException",
                msg: res,
              });
            }
          },
          (err) => {
            // reject(err)
            // console.log(err);
            resolve({
              type: "ErrorOrException",
              msg: err,
            });
          }
        );
      });
    },

    // 小文件上传
    fileUpload(formData) {
      return new Promise(function (resolve) {
        fileUpload(formData).then(
          (res) => {
            if (res.status === 200) {
              resolve(res);
            } else {
              resolve({
                type: "ErrorOrException",
                msg: res,
              });
            }
          },
          (err) => {
            // reject(err)
            // console.log(err);
            resolve({
              type: "ErrorOrException",
              msg: err,
            });
          }
        );
      });
    },

    cutFileIntoPieces(blob, bytesPerPiece, totalPieces) {
      const uuidfolder = uuid();
      // 开始切割的位置
      let start = 0;
      // 切割的结束位置
      let end;
      // 切片的索引
      let index = 0;
      // 文件的大小
      const filesize = blob.size;
      // console.log(filesize);
      // 启动while循环对文件切片
      while (start < filesize) {
        // 设置切片的结束位置
        end = start + bytesPerPiece;
        // 对最后一片数据进行处理（可以省略）
        if (end > filesize) {
          end = filesize;
        }
        // 切割文件
        const chunk = blob.slice(start, end); //切割文件
        const sliceIndex = uuidfolder + "_" + index;
        // 利用formData来传递数据
        const formData = new FormData();
        formData.append("sliceFile", chunk);
        formData.append("sliceName", sliceIndex);
        formData.append("sliceNo", index);
        formData.append("sliceNum", totalPieces);
        formData.append("sliceUrl", "");

        this.fileSliceList.push({
          formData,
          sliceIndex,
          index,
          status: "0", // 0: 未上传或上传失败，1: 成功上传
        });

        start = end;
        index++;
      }
    },

    createTasks() {
      if (this.fileList && this.fileList.length) {
        for (const item of this.fileList) {
          const blob = item.file;
          // 文件的大小
          const filesize = blob.size;
          // console.log(filesize);
          // 文件的名称
          const filename = blob.name;
          if (filesize <= this.bytesPerPiece) {
            // 利用formData来传递数据
            const formData = new FormData();
            formData.append("multipartFile", blob);
            this.taskList.push({
              type: "small",
              status: "0",
              filename,
              formData,
              callback: this.fileUpload,
            });
          } else {
            //计算文件切片总数
            let totalPieces = Math.ceil(filesize / this.bytesPerPiece);
            // 清空文件切片
            this.fileSliceList = [];
            this.cutFileIntoPieces(blob, this.bytesPerPiece, totalPieces);
            if (this.fileSliceList && this.fileSliceList.length) {
              for (const slice of this.fileSliceList) {
                this.taskList.push({
                  type: "slice",
                  status: "0",
                  slice,
                  filename,
                  totalPieces,
                  // callback: this.fileSliceUpload(slice.formData),
                  callback: this.fileSliceUpload,
                });
              }
              const t = [];
              for (const item of this.fileSliceList) {
                t.push({
                  index: item.index,
                  status: "0", // 0: 未上传或上传失败，1: 成功上传
                });
              }
              this.taskList.push({
                type: "merge",
                status: "0",
                filename,
                fileSliceList: t,
                totalPieces,
                filesize,
                // callback: this.mergeSlice(deepClone(this.fileSliceList), totalPieces, filesize, filename),
                callback: this.mergeSlice,
              });
            }
          }
        }
      }
    },

    async runTask() {
      const setPercent = (filename, percent) => {
        const file = this.fileList.filter((item) => item.filename === filename);
        if (file && file.length) {
          file[0].percent = percent;
        }
      };

      for (const task of this.taskList) {
        if (task.status === "0") {
          console.log(task);
          if (task.type === "slice") {
            const res = await task.callback(task.slice.formData);
            if (!res.type) {
              // 变更状态
              task.status = "1"; // 成功上传
              // task.slice.status = '1'
              // 更新合并任务中储存的切片列表的状态
              const t = this.taskList.filter((item) => item.type === "merge" && item.filename === task.filename);
              if (t && t.length) {
                const s = t[0].fileSliceList.filter((fs) => fs.index === task.slice.index);
                if (s && s.length) {
                  s[0].status = "1";
                }
              }
              // 已经成功上传的切片
              const sib = this.taskList.filter(
                (item) => item.type === "slice" && item.filename === task.filename && item.status === "1"
              );
              const p = sib && sib.length ? sib.length : 0;
              // 变更文件上传百分比 最大 90
              setPercent(task.filename, parseInt((p / task.totalPieces) * 90));
              // const file = this.fileList.filter(item => item.filename === task.filename)
              // if (file && file.length) {
              //     file[0].percent = p / task.totalPieces * 90
              // }

              // 保存返回数据
              const {
                data: {
                  data: { sliceUrl },
                },
              } = res;
              if (!this.sliceUrlList[task.filename]) {
                this.sliceUrlList[task.filename] = [];
              }
              this.sliceUrlList[task.filename].push({
                sliceFile: null,
                sliceName: task.slice.sliceIndex,
                sliceNo: task.slice.index,
                sliceUrl,
              });
            }
          } else if (task.type === "merge") {
            const res = await task.callback(task.fileSliceList, task.totalPieces, task.filesize, task.filename);
            if (!res.type) {
              task.status = "1";
              // const file = this.fileList.filter(item => item.filename === task.filename)
              // if (file && file.length) {
              //     file[0].percent = 100
              // }
              setPercent(task.filename, 100);
              this.fileIdList[task.filename] = res.data.fileId;
              this.mergeResult.push(res);
            }
          } else if (task.type === "small") {
            const res = await task.callback(task.formData);
            console.log(res);
            if (!res.type) {
              task.status = "1";
              setPercent(task.filename, 100);
              this.fileIdList[task.filename] = res.data.data.fileId;
              this.mergeResult.push(res);
            }
          }
        }
      }
      // 执行状态判断
      const t = this.taskList.filter((task) => task.status === "0");
      if (t && t.length) {
        // 变更组件状态 任务执行完，但是有失败任务
        this.uploadStatus = "f";
      } else {
        // 变更组件状态 全部执行成功
        this.uploadStatus = "s";
        this.taskList = [];
        this.fileSliceList = [];
        this.sliceUrlList = {};
        this.$emit("fileUploadFinished", deepClone(this.mergeResult));
        this.mergeResult = [];
        //
        if (this.config.cantDeleteServerFile) {
          this.delImgBtnFlag = false;
        }
      }
    },

    uploadBtnClickHandle() {
      // 变更组件状态 正在上传
      this.uploadStatus = "u";
      this.createTasks();
      this.runTask();
    },

    clear() {
      this.fileList = [];
      this.uploadImgBtnFlag = true;
      this.delImgBtnFlag = true;
      this.taskList = [];
      this.sliceUrlList = {};
      this.fileSliceList = [];
      this.mergeResult = [];
      this.uploadStatus = "n";
    },
    getFileList() {
      return this.fileList;
    },
    reUpload() {
      // 变更组件状态 正在上传
      this.uploadStatus = "u";
      // this.sliceUpload(0)
      this.runTask();
    },
    checkViewList() {
      if (this.config.viewList && this.config.viewList.length) {
        this.uploadStatus = "s";
        this.fileList = [];
        this.fileIdList = {};
        for (const file of this.config.viewList) {
          this.fileIdList[file.name] = file.fileId;
          this.fileList.push({
            file: { name: file.name },
            percent: 0,
            filename: file.name,
            isDelServerFile: false,
          });
        }
      }
    },
  },
  created() {
    // this.fileIdForData = this.config.fileId
    // this.fileIdForData = this.config.fileId
  },
  mounted() {
    this.fileDom = document.getElementById(this.config.domId);
    // console.log(this.fileDom);
    this.maxFileSize = parseInt((this.config.maxFileSize * 1) / 1024 / 1024 / 1024);
  },
  watch: {
    "config.viewList": {
      handler(newVal) {
        if (newVal && newVal.length) {
          console.log(newVal);
          this.checkViewList();
        }
      },
      immediate: true,
      deep: true,
    },
    // fileId(newVal) {
    //     if (newVal) {
    //         this.fileIdForData = newVal
    //     }
    // }
  },
};
</script>

<style lang="scss" scoped>
.uploader-container {
  border: 1px dashed #bacfe7;
  min-height: 300px;
  border-radius: 5px;
  background: #f4f7fa;

  .mag-t-10 {
    margin-top: 10px;
  }

  .link {
    color: #00796a;
  }

  .pointer {
    cursor: pointer;
  }

  .upload-img-btn {
    width: 80px;
    height: 80px;
    margin: 40px auto;
    cursor: pointer;
  }

  .file-list {
    min-height: 160px;

    .file-item {
      margin: 5px 8px;
      background: #fff;
      height: 44px;
      line-height: 44px;
      padding: 0 10px;
    }
  }
}
</style>

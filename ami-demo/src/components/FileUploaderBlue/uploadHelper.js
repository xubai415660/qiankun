/**
 * @description：大文件上传配置
 * @author：宋乾
 * @date：Created in 2022/02/16 16:45
 * @modified By：
 * @version: 1.0.0
 */
import { uuid } from "./uuid";
import { fileSliceUpload, mergeSlice, fileUpload, deleteFile } from "./api";
import { deepClone } from "@/utils/util";

export default class UploadHelper {
  config = {};
  // 文件切片列表
  fileSliceList = [];
  fileList = [];
  delImgBtnFlag = true;
  taskList = [];
  sliceUrlList = {};
  fileSliceList = [];
  mergeResult = [];
  uploadStatus = "n"; // n: 没有选择文件，u：正在上传，f: 任务执行完，但是有失败任务，s: 全部执行成功
  bytesPerPiece = 0; // 每个文件切片大小定为5M
  fileIdList = {};
  $emit = null;
  $on = null;
  alreadyTriedTimes = 0; // 已经断点续传了多少次
  // $message = null;

  loadDepencies(config) {
    this.config = config;
    this.bytesPerPiece = this.config.sliceLength;
    if (this.bytesPerPiece < 1024 * 1024 * 5) {
      throw new Error("文件切片尺寸不能小于5M");
    }
    return this;
  }

  delFile(item) {
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

  // 删除文件
  deleteFile(formData, fileInfo) {
    const sendMsg = (msg) => {
      if (this.$emit) {
        this.$emit("fileDeleteFinished", msg);
      }
    };
    fileInfo.isDelServerFile = true;
    deleteFile(formData).then(
      (res) => {
        if (res.status === 200) {
          this.fileList = this.fileList.filter((item) => item.filename !== fileInfo.filename);
          delete this.fileIdList[fileInfo.filename];
          if (this.fileList.length === 0) {
            this.uploadStatus = "n";
          }
          // if (this.$emit) {
          //   this.$emit("fileDeleteFinished", { fileInfo, res, fileList: this.fileList });
          // }
          sendMsg({ fileId: formData.fileId, fileInfo, res, fileList: this.fileList });
        } else {
          // console.log(res);
          sendMsg({ fileId: formData.fileId, fileInfo, res, fileList: this.fileList });
          fileInfo.isDelServerFile = false;
        }
      },
      (err) => {
        // console.log(err);
        sendMsg({ fileId: formData.fileId, fileInfo, err, fileList: this.fileList });
        fileInfo.isDelServerFile = false;
      }
    );
  }

  deleteFileFromViewList(fileId) {
    const formData = {
      bucketName: "",
      createDate: "",
      creator: "",
      fileId: fileId,
      fileName: "",
      fileSize: 0,
      fileType: "",
      fileUrl: "",
      fullName: "",
    };
    return new Promise((resolve, reject) => {
      deleteFile(formData).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteFileFromViewer(iFileViewer) {
    const formData = {
      bucketName: "",
      createDate: "",
      creator: "",
      fileId: iFileViewer.fileId,
      fileName: "",
      fileSize: 0,
      fileType: "",
      fileUrl: "",
      fullName: "",
    };
    return new Promise((resolve, reject) => {
      deleteFile(formData).then(
        (res) => {
          if (this.fileList && this.fileList.length) {
            this.fileList = this.fileList.filter((item) => item.filename !== iFileViewer.fileName);
            delete this.fileIdList[iFileViewer.fileName];
            if (this.fileList.length === 0) {
              this.uploadStatus = "n";
            }
          }
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

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
        // console.log("merge happened");
        // console.log(that.sliceUrlList);
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
              // this.$message({
              //     message: "服务器错误",
              //     type: "error",
              //     duration: 2000,
              // });
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
  }

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
  }

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
  }

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
  }

  createTasks() {
    if (this.fileList && this.fileList.length) {
      // console.log(this.fileList);
      for (const item of this.fileList) {
        if (item.percent === 100) {
          continue;
        }
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
            const c = this.mergeSlice.bind(this);
            this.taskList.push({
              type: "merge",
              status: "0",
              filename,
              fileSliceList: t,
              totalPieces,
              filesize,
              // callback: this.mergeSlice(deepClone(this.fileSliceList), totalPieces, filesize, filename),
              callback: c,
            });
          }
        }
      }
    }
  }

  async runTask() {
    const setPercent = (filename, percent) => {
      const file = this.fileList.filter((item) => item.filename === filename);
      if (file && file.length) {
        file[0].percent = percent;
      }
    };
    // const that = this;
    for (const task of this.taskList) {
      if (task.status === "0") {
        // console.log(task);
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
            // console.log("-------- slice uploaded --------", this.sliceUrlList);
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
          // console.log(res);
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
      this.alreadyTriedTimes++;
      this.$emit("uploadFinishedWithFailure", this.alreadyTriedTimes);
    } else {
      // 变更组件状态 全部执行成功
      this.uploadStatus = "s";
      this.taskList = [];
      this.fileSliceList = [];
      this.sliceUrlList = {};
      this.alreadyTriedTimes = 0;
      if (this.$emit) {
        this.$emit("fileUploadFinished", deepClone(this.mergeResult));
        // console.log(this.$emit);
      }
      this.mergeResult = [];
      //
      this.delImgBtnFlag = this.config.cantDeleteServerFile;
      // console.log("fileUploadFinished");
    }
  }

  uploadHandle() {
    // 变更组件状态 正在上传
    this.uploadStatus = "u";
    this.createTasks();
    this.runTask();
  }

  clear() {
    this.fileList = [];
    this.delImgBtnFlag = true;
    this.taskList = [];
    this.sliceUrlList = {};
    this.fileSliceList = [];
    this.mergeResult = [];
    this.uploadStatus = "n";
    this.alreadyTriedTimes = 0;
  }

  getFileList() {
    return this.fileList;
  }

  reUpload() {
    // 变更组件状态 正在上传
    this.uploadStatus = "u";
    // this.sliceUpload(0)
    this.runTask();
  }

  changeFileTitle(e) {
    delete this.fileIdList[e.oldName];
    this.fileIdList[e.newName] = e.fileId;
    const index = this.fileList.findIndex((item) => item.filename === e.oldName);
    if (index > -1) {
      this.fileList[index].filename = e.newName;
    }
  }

  watchEvent() {
    if (this.$on) {
      this.$on("uploadFinishedWithFailure", (e) => {
        if (e < this.config.tryTimes) {
          this.reUpload();
        }
        // console.log(e, this.taskList);
      });
    }
  }
}

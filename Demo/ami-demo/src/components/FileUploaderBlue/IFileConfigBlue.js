/**
 * @description：大文件上传配置
 * @author：宋乾
 * @date：Created in 2022/02/16 16:45
 * @modified By：
 * @version: 1.0.0
 */
import { uuid } from "./uuid";

export const ComponentMode = {
  upload: 1,
  edit: 2,
};

export class IFileConfigBlue {
  // 有文件分片上传失败时，重复上传的次数；
  tryTimes = 3;

  // 组件模式
  mode = ComponentMode.upload;

  // drag area dom id
  dragAreaDomId = uuid();
  // id
  domId = uuid();
  // 是否多文件
  isMultiple = false;
  // 文件类型
  // fileAccept = "image/jpg, image/png, image/jpeg, image/gif, text/plain, video/mp4, mp4";
  fileAccept = `
    application/msword,
    application/x-zip-compressed,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  `;
  // 切片长度
  sliceLength = 1024 * 1024 * 5; // 5M
  // 文件大小限制
  maxFileSize = 1024 * 1024 * 1024 * 5; // 5G
  // 禁止删除上传成功的文件
  cantDeleteServerFile = false;
  // 提示
  reminder = "支持上传文件格式为：doc,pdf,xls,计算包";
  // 按钮文本
  buttonTxt = "上传文件";
  // [{ name: "", fileId: "" }]
  viewList = [];

  viewLength = 0;

  // 回显列表
  // 文件数量限制
  fileQuantityLimit = 3;

  // 是否支持文件夹
  doesSupportDirectory = false;

  constructor() {}
}

/**
 * 常用配置
 */
export const MyCommonFileConfig = (() => {
  const config = new IFileConfigBlue();
  config.doesSupportDirectory = true;
  return config;
})();

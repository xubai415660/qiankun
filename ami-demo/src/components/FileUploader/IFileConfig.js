/**
 * @description：大文件上传配置
 * @author：宋乾
 * @date：Created in 2022/02/16 16:45
 * @modified By：
 * @version: 1.0.0
 */
import { uuid } from "./uuid";

export class IFileConfig {
  // id
  domId = uuid();
  // 是否多文件
  isMultiple = false;
  // 文件类型
  fileAccept = ".zip, .rar";
  // 切片长度
  sliceLength = 1024 * 1024 * 1; // 5M
  // 文件大小限制
  maxFileSize = 1024 * 1024 * 1024 * 5; // 5G
  // 禁止删除上传成功的文件
  cantDeleteServerFile = false;
  // 提示
  reminder = "注：限上传3个文件，单个文件最大为5G";
  // 按钮文本
  buttonTxt = "上传文件";
  // [{ name: "", fileId: "" }]
  viewList = [];
  // 回显列表
  // 文件数量限制
  fileQuantityLimit = 3;

  constructor() {}
}

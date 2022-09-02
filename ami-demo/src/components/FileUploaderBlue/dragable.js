/*
@description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
*/
import { uploadedFileList } from "./dragFunc";

export const addDragEvent = (
  target,
  over = () => {},
  leave = () => {},
  drop = () => {},
  end = () => {},
  noDefaultFunc = false
) => {
  //拖拽上传文件
  target.addEventListener(
    "dragover",
    (e) => {
      e.stopPropagation();
      //必须阻止默认事件
      e.preventDefault();

      over(e);
    },
    false
  );

  target.addEventListener(
    "dragleave",
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      leave(e);
    },
    false
  );

  target.addEventListener(
    "drop",
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      let res = [];
      if (!noDefaultFunc) {
        res = uploadedFileList(e);
      }
      // console.log(res);
      drop(e, res);
    },
    false
  );

  target.addEventListener("dragend", (e) => {
    // console.log(e);
    end(e);
  });
};

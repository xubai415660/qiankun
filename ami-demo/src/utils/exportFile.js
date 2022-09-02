/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
export const exportFile = (result) => {
  console.log("result", result);
  let contentDisposition = result.headers["content-disposition"];
  // 这里后端给的内容中，文件名字可能是驼峰式名称的 fileName ，或者是全部小写的 filename
  let filename = decodeURI(contentDisposition.split("fileName=")[1] || contentDisposition.split("filename=")[1]);
  // let filename = "1.xlsx";
  // 注意这里的 result.data ，如果只传 result 的话，最后下载出来的excel文件，里面显示的是 [object Object]
  let blob = new Blob([result.data], { type: result.headers["content-type"] });
  // let blob = new Blob([result.data],{type: "application/x-msdownload;charset=GBK"});
  // let blob = new Blob([result.data],{type: "application/x-msdownload"});
  // let blob = new Blob([result.data]);
  // let blob = new Blob([result.data],{type: "application/vnd.ms-excel"});
  let url = window.URL.createObjectURL(blob);
  if (window.navigator.msSaveBlob) {
    //IE
    try {
      window.navigator.msSaveBlob(blob, filename);
    } catch (e) {
      console.log(e);
    }
  } else {
    //非IE
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  }
  URL.revokeObjectURL(url); // 释放内存
};

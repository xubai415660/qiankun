/*
@description：大文件上传使用dome
 @author：宋乾
 @date：Created in  2022/5/17 09:36
 @modified By：
 @version: 1.0.0
*/
import { MyCommonFileConfig } from "./IFileConfigBlue";

async function getFilesAsync(dataTransfer) {
  // console.log(dataTransfer);
  const files = [];
  for (let i = 0; i < dataTransfer.items.length; i++) {
    const item = dataTransfer.items[i];
    if (item.kind === "file") {
      if (typeof item.webkitGetAsEntry === "function") {
        const entry = item.webkitGetAsEntry();
        const entryContent = await readEntryContentAsync(entry);
        files.push(...entryContent);
        continue;
      }

      const file = item.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  }

  return files;
}

function readEntryContentAsync(entry) {
  return new Promise((resolve) => {
    let reading = 0;
    const contents = [];
    readEntry(entry);
    function readEntry(entry) {
      if (isFile(entry)) {
        reading++;
        entry.file((file) => {
          reading--;
          contents.push(file);
          if (reading === 0) {
            resolve(contents);
          }
        });
      } else if (isDirectory(entry) && MyCommonFileConfig.doesSupportDirectory) {
        readReaderContent(entry.createReader());
      }
    }
    function readReaderContent(reader) {
      reading++;
      reader.readEntries(function (entries) {
        reading--;
        for (const entry of entries) {
          readEntry(entry);
        }
        if (reading === 0) {
          resolve(contents);
        }
      });
    }
  });
}

function isDirectory(entry) {
  return entry.isDirectory;
}

function isFile(entry) {
  return entry.isFile;
}

export const uploadedFileList = async (e) => {
  let ret = [];
  ret = await getFilesAsync(e.dataTransfer);
  return ret;
};

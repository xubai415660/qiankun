/**
 * @description：自定义校验规则
 * @author：
 * @date：Created in 2021/12/22 16:20
 * @modified By：
 * @version: 1.0.0
 */
const { validUpper } = require("@/utils/validate");
// 只能输入大写字母与下划线
export const tableCodeValidUpper = (rule, val, callback) => {
  if (val != null && val != "") {
    const value = val.replace(/^\s*|\s*$/g, "");
    if (!validUpper(value)) {
      callback(new Error("只能输入大写字母与下划线"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 只能输入中文
export const tableNameValidUpper = (rule, val, callback) => {
  if (val != null && val != "") {
    const value = val.replace(/^\s*|\s*$/g, "");
    if (!/^[\u4E00-\u9FA5]*$/.test(value)) {
      callback(new Error("只能输入中文"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 不允许输入特殊字符
export const remarkValidUpper = (rule, val, callback) => {
  if (val != null && val != "") {
    const value = val.replace(/^\s*|\s*$/g, "");

    if (!/^[0-9a-zA-Z\u4E00-\u9FA5]*$/.test(value)) {
      callback(new Error("不允许输入特殊字符"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 只能输入数字
export const numberValidUpper = (rule, val, callback) => {
  console.log("val====>", val);
  if (val != null && val != "") {
    if (Number(val)) {
      if (!/^\d+$/.test(val)) {
        callback(new Error("只能输入数字"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
};
// 只能输入数字和forever
export const foreverValidUpper = (rule, val, callback) => {
  const value = val.replace(/^\s*|\s*$/g, "");
  if (val != null && val != "") {
    if (value === "forever") {
      callback();
    } else {
      if (!/^\d+$/.test(value)) {
        callback(new Error("只能输入forever和数字"));
      } else {
        callback();
      }
    }
  } else {
    callback();
  }
};
// 只能输入数字和English
export const englishValidUpper = (rule, val, callback) => {
  if (val != null && val != "") {
    if (!/^[A-Za-z0-9]+$/.test(val)) {
      callback(new Error("只能输入数字和英文"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 只能输入数字,且位数只能在16个
export const numberValidUppers = (rule, val, callback) => {
  console.log("val====>", val);
  if (val != null && val != "") {
    if (Number(val)) {
      if (!/^\d{0,16}$/g.test(val)) {
        callback(new Error("只能输入数字"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  }
};

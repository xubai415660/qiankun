/**
 * @description: 将时间转换为2020/1/1
 * @param {String} timestamp 需要转换的时间
 * @return {String} t 转换后的时间
 */
export const formatTs = function (timestamp) {
  const t = new Date(timestamp).toLocaleDateString();
  return t;
};
/**
 * @description: 与当前时间的时间差
 * @param {String} date 需要转换的时间
 * @return {String} 时间差
 */
export const formatTimestamp = function (date) {
  const t = new Date(date).toLocaleDateString();
  const timestamp = new Date(t);
  const currentTime = new Date();
  return currentTime - timestamp;
};

/**
 * @description: 返回当前月和最后一天
 * @param {String} timeSecond 需要转换的时间例如："2020-1-1"
 * @return {Array} ["2020-01-01", "2020-01-31", "2020-01"]
 */
export const getDateRange = function (timeSecond) {
  const timeDifference = formatTimestamp(timeSecond);
  const time = new Date(timeSecond);
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  const month2 = month;
  let day = timeDifference >= 30 * 24 * 3600 * 1000 ? time.getDate() : new Date(new Date()).getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  const day31 = [1, 3, 5, 7, 8, 10, 12];
  let timeStart = null;
  let timeEnd = null;
  const yearMonth = `${year}-${month}`;
  // 获取当前的时间
  if (timeDifference >= 30 * 24 * 3600 * 1000) {
    timeStart = `${year}-${month}-${day}`;
    for (let i = 0; i < day31.length; i++) {
      if (day31[i] === month2) {
        timeEnd = `${year}-${month}-${31}`;
        break;
      } else if (month2 === 2) {
        timeEnd = `${year}-${month}-${28}`;
      } else {
        timeEnd = `${year}-${month}-${30}`;
      }
    }
  } else {
    timeStart = `${year}-${month}-${"01"}`;
    timeEnd = `${year}-${month}-${day}`;
  }
  return [timeStart, timeEnd, yearMonth];
};

/**
 * @description: 当前系统日期 yyyy-MM-dd
 * @param {String} date 需要转换的时间例如："2020-1-1"
 * @return {String} "2020-01-01"
 */
export const getYearMonthDay = function (date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  let MM = d.getMonth() + 1;
  MM = MM < 10 ? `0${MM}` : MM;
  let dd = d.getDate();
  dd = dd < 10 ? `0${dd}` : dd;
  return `${yyyy}-${MM}-${dd}`;
};
/**
 * @description: 格式 年-月
 * @param {String} date 需要转换的时间例如："2020-1-1"
 * @return {String} 年月
 */
export const getYearMonth = function (date) {
  const d = new Date(date);
  const datetime = d.getFullYear() + "-" + (d.getMonth() + 1);
  return datetime;
};
/**
 * @description: 格式 时间到时分秒
 * @param {String} date 需要转换的时间例如："2020-1-1"
 * @return {String} 年月日时分秒
 */
export const format = function (date) {
  if (!date) return;
  var date2 = new Date(date);
  var y = date2.getFullYear();
  var m = date2.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date2.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date2.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date2.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var seconds = date2.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + seconds;
};
/**
 * @description: 格式 处理时间到时
 * @param {String} date 需要转换的时间
 * @param {String} h 不足两位补两位
 * @return {String} 年月日时
 */
export const todayTime = function (date, h) {
  var date2 = new Date(date);
  var y = date2.getFullYear();
  var m = date2.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date2.getDate();
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  return y + "-" + m + "-" + d + " " + h + ":" + "00" + ":" + "00";
};
/**
 * @description: 格式 处理时间到年月日
 * @param {String} date 需要转换的时间
 * @return {String} 年月日
 */
export const todayTime1 = function (date) {
  var date2 = new Date(date);
  var y = date2.getFullYear();
  var m = date2.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date2.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d + " " + "00" + ":" + "00" + ":" + "00";
};
/**
 * @description: 格式 获取是分秒
 * @param {String} date 需要转换的时间
 * @param {String} type 转换类型
 * @return {String} 时分/时分秒
 */
export const formatTime = function (date, type) {
  if (!date) return;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if (type === "HH:mm") {
    return h + ":" + minute;
  }
  return h + ":" + minute + ":" + seconds;
};
/**
 * @description: 格式 获取周几
 * @param {String} date 需要转换的时间
 * @return {String} 星期几
 */
export const formatDay = function (date) {
  if (!date) return;
  var days = date.getDay();
  switch (days) {
    case 1:
      days = "星期一";
      break;
    case 2:
      days = "星期二";
      break;
    case 3:
      days = "星期三";
      break;
    case 4:
      days = "星期四";
      break;
    case 5:
      days = "星期五";
      break;
    case 6:
      days = "星期六";
      break;
    case 0:
      days = "星期日";
      break;
  }

  return days;
};
/**
 * @description: 转换时间戳年月日
 * @param {String} str 需要转换的时间
 * @return {String} 时间戳
 */
export const getLocalTimes = (str) => {
  if (!str || str === null || str === "") {
    return str;
  }
  var tf = function (i) {
    return (i < 10 ? "0" : "") + i;
  };
  var oDate = new Date(str);
  var oYear = oDate.getFullYear() + "-";
  var oMonth = (oDate.getMonth() + 1 < 10 ? "0" + (oDate.getMonth() + 1) : oDate.getMonth() + 1) + "-";
  var oDay = tf(oDate.getDate()) + " ";
  return oYear + oMonth + oDay;
};
/**
 * @description 获取当前时间的年月日信息星期几的信息
 * @param date
 * @return {{month: number, year: number, days: number, day: number}}
 */
export const getNewDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let days = date.getDay();
  return { year, month, day, days };
};
/**
 * @description获取一个月份的所有天数
 * @param year 年份
 * @param month 月份
 * @return {[]} 一个月所有天数的数组
 */
export const getMonthList = (year, month) => {
  let d = new Date(year, month, 0).getDate(); // 获取某一个月的天数
  let list = [];
  for (let j = 0; j < d; j++) {
    list.push(month + "-" + (j + 1));
  }
  return list;
};
/**
 * 返回每个月的开始时候和结束时间，或者一年的开始时间和结束时间
 * @param date 时间对象
 * @param status 1：月，2：年
 * @param flag 0：开始时间，1：结束时间
 * @returns {string} 返回时间字符串格式 xxxx-xx-xx xx:xx:xx
 */
export const getYearOrMonthFirstTime = (date, status, flag) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  if (status === 1) {
    if (flag === 0) {
      month = month + 1;
      return year + "-" + (month < 10 ? `0${month}` : month) + "-01 00:00:00";
    } else {
      let day = new Date(year, month, 0);
      month = month + 1;
      return year + "-" + (month < 10 ? `0${month}` : month) + "-" + day.getDate() + " 23:59:59";
    }
  } else {
    if (flag === 0) {
      return year + "-" + "01" + "-01 00:00:00";
    } else {
      return year + "-" + "12" + "-31 23:59:59";
    }
  }
};
/**
 * @description 根据当前时间获取上个月的时间
 * @param date 传入的时间
 * @return {string} 返回时间字符串格式 xxxx-xx-xx xx:xx:xx
 */
export const getLastMouthDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let dateTime = new Date(year, month - 1, 1);
  return format(dateTime);
};

/**
 * @description 获取当前月的第一天
 * @param date 日期时间
 * @return {string} 返回xxxx-xx-xx格式的字符串时间
 */
export const getMouthFirstDay = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  let MM = d.getMonth() + 1;
  MM = MM < 10 ? `0${MM}` : MM;
  return `${yyyy}-${MM}-01`;
};

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

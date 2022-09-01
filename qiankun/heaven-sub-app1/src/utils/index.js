/*
 * @description:
 * @author: 王浩
 * @Date: 2022-09-01 10:40:53
 * @Modified By:
 * @version: 1.0.0
 */
// 防抖函数
export function debounce (func, delay) {
  // 维护一个 timer
  let timer = null;
  return function () {
    clearTimeout(timer);
    // eslint-disable-next-line consistent-this
    const context = this,
      args = arguments;
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

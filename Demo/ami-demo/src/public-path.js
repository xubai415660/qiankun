/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
(function () {
  if (window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-undef
      __webpack_public_path__ = `//localhost:8010/`;
      return;
    }
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();

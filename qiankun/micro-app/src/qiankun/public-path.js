/*
 * @description:乾坤子应用配置文件
 * @author: 王浩
 * @Date: 2022-08-27 16:50:19
 * @Modified By:
 * @version: 1.0.0
 */

// 判断是否是生产环境
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

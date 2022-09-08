/********************************************************
 * @description：配置编译环境和线上环境之间的切换
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
let baseUrl = "";
const env = process.env;
if (env.NODE_ENV === "development") {
  baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV === "production") {
  baseUrl = ``; //生产环境地址
} else if (env.NODE_ENV === "test") {
  baseUrl = ``; //测试环境地址
}

export { baseUrl };

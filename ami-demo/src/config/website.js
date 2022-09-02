/********************************************************
 * @description：全局配置文件
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
export default {
  title: "SEA",
  indexTitle: "SEA Admin",
  clientId: "sea", // 客户端id
  clientSecret: "sea", // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  captchaMode: true, // 是否开启验证码模式
  logo: "S",
  key: "sea", //配置主键,目前用于存储
  // 授权地址
  authUrl: "http://localhost/blade-auth/oauth/render",
  exportNum: 20000,
};

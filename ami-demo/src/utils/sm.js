/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
const sm2 = require("sm-crypto").sm2;
const sm3 = require("sm-crypto").sm3;
const cipherMode = 0;
const publicKey =
  "04653cbaf779a6c52581b7835e645b8703cab40ef3396045c4288e4a489239bb83cb44119e71901ac4e245cb7ce0a32d0c3263cac8948d3d8f76bbd7ed138bdc1e";

export const sm2Encode = (data) => {
  let encryptPwd = "04" + sm2.doEncrypt(data, publicKey, cipherMode);
  return encryptPwd;
};
export const sm3Encode = (data) => {
  let encryptPwd = sm3(data);
  return encryptPwd;
};

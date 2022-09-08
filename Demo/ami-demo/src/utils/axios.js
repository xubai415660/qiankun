/********************************************************
 * @description：
 * @author：
 * @date：Created in 2022/3/23 10:19
 * @modified By：
 * @version: 1.0.0
 *******************************************************/
import axios from "axios";
// import store from "@/store";
import { baseUrl } from "@/config/env";
import website from "@/config/website";
import { getToken } from "@/utils/store";
import { remoteEvent } from "@/utils/remoteUtil";
import { sm2Encode, sm3Encode } from "@/utils/sm";

const AmiUI = require("ami-ui");

const config = {
  baseURL: baseUrl,
  timeout: 25000,
};
// create an axios instance
const service = axios.create(config);
service.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
service.defaults.headers["Content-type"] = "application/json";
service.defaults.headers["clientId"] = website.clientId;

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
      config.headers["Authorization"] = "Bearer " + token;
    }
    let timestamp = new Date().getTime();
    let nonce = MathRand();
    //生成时间戳
    config.headers["Timestamp"] = timestamp;
    //生成6位随机数
    config.headers["Nonce"] = nonce;
    //获取参数
    let param = "";
    if (config.data) {
      param = JSON.stringify(config.data);
    }
    if (config.params) {
      param = JSON.stringify(config.params);
    }
    //生成加密串
    let sign = "Timestamp" + timestamp + "Nonce" + nonce + sm3Encode(param);
    config.headers["Sign"] = sm2Encode(sign);
    return config;
  },
  (error) => {
    // do something with request error
    console.error("request err: " + error);
    return Promise.reject(error);
  }
);
// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 200) {
      return response;
    } else if (res.code === 406) {
      console.log("子应用token认证失效 进行刷新token");
      // token认证失效 进行刷新token
      // store.dispatch("global/setGlobalState", { needRefresh: true });
      const { config } = response;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then(() => {
            config.baseURL = "";
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb) => cb());
            requests = [];
            return service(config);
          })
          .catch((res) => {
            console.error("refreshtoken error =>", res);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      // 正在刷新token，将返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push(() => {
          config.baseURL = "";
          resolve(service(config));
        });
      });
    } else if (res.code !== undefined || response.status !== 200) {
      AmiUI.Message({
        message: res.message || res.msg || "Error",
        showClose: true,
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || res.msg || "Error"));
    } else {
      return response;
    }
  },
  (error) => {
    console.error("response err: " + error);
    AmiUI.Message({
      message: error.message,
      showClose: true,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

function refreshToken() {
  return new Promise((resolve) => {
    remoteEvent.emit("public.home.refreshToken");
    remoteEvent.on("public.home.refreshToken.success", () => {
      resolve();
    });
  });
}

function MathRand() {
  let num = "";
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

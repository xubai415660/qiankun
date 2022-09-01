// import router from '@/router'
import axios from 'axios';
import { Message } from 'element-ui';

// 创建 axios 实例
const service = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

// 拦截 request 请求
service.interceptors.request.use(
    function (config) {
        // 统一添加配置信息
        // 防止IE浏览器缓存
        config.headers.common['Cache-Control'] = 'no-cache';
        // 获取 token，若不存在，则为空
        const token = localStorage.getItem('token');
        if (token) {
            // 如果存在 token，则每个请求 header 都加上 token
            config.headers.authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 拦截 response, 统一处理错误
service.interceptors.response.use(
    function (response) {
        if (response.data && response.status === 200) {
            return response;
        }
        return Promise.reject(new Error(response));
    },
    function (error) {
        // axios 获得的响应 status code 超出了 2xx 的范围时,统一处理接口错误
        if (!window.navigator.onLine) {
            // 断网处理
            // router.push('/error')
        } else {
            if (error && error.response) {
                const duration = 3000,
                    errorStatusHash = {
                        401: '权限不足',
                        404: '请求路径不存在'
                        // 500: '服务器异常'
                    };
                if (error.response.status in errorStatusHash) {
                    Message({
                        message: errorStatusHash[error.response.status],
                        type: 'error',
                        duration
                    });
                    if (error.response.status === 500) {
                        const errMsgHash = {
                            S00001: '接口超时',
                            S00002: '接口解析错误',
                            S00003: '接口返回数据异常',
                            S00004: '代码报错',
                            S00005: '数据库报错'
                        };
                        console.log(errMsgHash[error.response.data.code] || '服务器异常');
                        // Message({
                        //   message: '服务器异常',
                        //   type: 'error',
                        //   duration: 3 * 1000
                        // })
                    }
                } else {
                    Message({
                        message: '操作失败',
                        type: 'error',
                        duration: 3 * 1000
                    });
                }
            }
        }
        return Promise.reject(error);
    }
);

// 实例变量支持 all
service.all = axios.all;

export default service;

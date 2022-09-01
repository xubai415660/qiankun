/*
 * @description:
 * @author: 王浩
 * @Date: 2022-08-31 17:56:26
 * @Modified By:
 * @version: 1.0.0
 */
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = defineConfig({
    devServer: {
        port: 9080,
        proxy: {
            // 代理本地开发时子应用运行地址
            '/child/heaven-sub-app1': {
                target: 'http://localhost:9081',
                changeOrigin: true
            },
            '/child/heaven-sub-app2': {
                target: 'http://localhost:9082',
                changeOrigin: true
            }
        }
    },
    transpileDependencies: true,
    chainWebpack: (config) => {
        // 配置别名
        config.resolve.alias.set('@', resolve('src'));
    }
});

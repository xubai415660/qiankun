/*
 * @description:配置文件
 * @author: 王浩
 * @Date: 2022-09-01 09:40:52
 * @Modified By:
 * @version: 1.0.0
 */
const { defineConfig } = require('@vue/cli-service'),
  path = require('path'),
  // 每个微应用的name必须唯一
  { name } = require('./package.json');
const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  // 为了方便后续部署，将子应用的publicPath添加一个固定的前缀
  publicPath: `/child/${name}`,
  devServer: {
    // 推荐固定端口，方便调试（可选）
    port: 9081,
    // 允许跨域让基座加载微应用
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    // 配置打包格式
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      // webpack5以下使用 jsonpFunction 配置
      // jsonpFunction: `webpackJsonp_${name}`
      // webpack5及以上使用 chunkLoadingGlobal 配置
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  },
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          // 生效代码:compressed/nested/expanded/compact
          outputStyle: 'expanded'
        }
      }
    }
  }
})

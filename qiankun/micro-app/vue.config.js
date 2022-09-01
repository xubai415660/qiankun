
const { defineConfig } = require('@vue/cli-service'),
  { name } = require('./package.json')
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
  }
});

const { name: packageName, version } = require("./package.json");
const port = require("./package.json").port;
const BASE_URL = process.env.NODE_ENV === "production" ? "./" : "/";
const path = require("path");
const DateTime = new Date(+new Date() + 8 * 3600 * 1000)
  .toISOString()
  .replace(/T/g, " ")
  .replace(/\.[\d]{3}Z/, "");
console.log("DateTime===>", DateTime);
const Timestamp = new Date().getTime();
console.log(Timestamp);
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  assetsDir: "./",
  outputDir: `../dist/${packageName}`,
  chainWebpack: (config) => {
    // 忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "ami-ui": "ELEMENT",
    });
    config.resolve.alias.set("@", resolve("src")).set("_c", resolve("src/components"));
    if (process.env.NODE_ENV === "production") {
      // 给js和css配置版本号
      config.output.filename("js/[name]." + Timestamp + ".js").end();
      config.output.chunkFilename("js/[name]." + Timestamp + ".js").end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `css/[name].${Timestamp}.css`,
          chunkFilename: `css/[name].${Timestamp}.css`,
        },
      ]);
    }
    config.plugin("define").tap((args) => {
      args[0]["process.env"].version = JSON.stringify(`${packageName}|${version}|${Timestamp}`);
      return args;
    });
  },
  css: {
    loaderOptions: {
      // 具体路径根据你们项目来
      scss: {
        prependData: `@import "@/assets/css/moduleMain.scss";`,
      },
    },
  },
  publicPath: BASE_URL,
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
  devServer: {
    port: port,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/ami/cdn": {
        // target: "http://192.168.61.94:5500/",
        target: "http://192.168.1.249:8111/cdn/cdns", //开发环境cdn
        //target: "http://192.168.1.214:16223/ami/cdn", //生产环境cdn
        changeOrigin: true,
        pathRewrite: {
          "^/ami/cdn": "",
        },
      },
      "/ami/ma01-00-101": {
        target: "http://192.168.1.214:16223/ami/ma01-00-101/",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-00-101": "",
        },
      },
      //在线编辑excel
      "/ami/ma01-02-061": {
        target: "http://192.168.1.214:16223/ami/ma01-02-061",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-061": "",
        },
      },
      // 流程图
      "/ami/ma01-02-062": {
        target: "http://192.168.1.214:16223/ami/ma01-02-062",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-062": "",
        },
      },
      // 大文件上传
      "/ami/ma01-02-056": {
        target: "http://192.168.1.214:16223/ami/ma01-02-056",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-056": "",
        },
      },
      "/ami/ma01-04-025": {
        target: "http://192.168.1.214:3131/ami/ma01-04-025",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-04-025": "",
        },
      },
      "/ami/ma01-04-003": {
        target: "http://192.168.1.214:16223/ami/ma01-04-003",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-04-003": "",
        },
      },
      "/ami/ma01-02-067": {
        target: "http://192.168.1.214:16223/ami/ma01-02-067",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-067": "",
        },
      },
      "/ami/ma01-02-063": {
        target: "http://192.168.1.214:16223/ami/ma01-02-063",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-063": "",
        },
      },
      "/ami/ma01-02-064": {
        target: "http://192.168.1.214:16223/ami/ma01-02-064",
        changeOrigin: true,
        pathRewrite: {
          "^/ami/ma01-02-064": "",
        },
      },
    },
  },
};

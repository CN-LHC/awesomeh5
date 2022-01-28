const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// const sourceMap = process.env.NODE_ENV === "development";
// Generate pages object
const pagesObj = {};

const pages = ["index"];

pages.forEach((name) => {
  pagesObj[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

let plugins = [
  new CopyWebpackPlugin([
    {
      from: path.resolve("src/assets"),
      to: `${path.resolve("dist")}/assets`,
    },
  ]),
];

const publicPath = process.env.NODE_ENV === "production" ? "/h5" : "/";

const px2rem = require("postcss-px2rem");
const postcss = px2rem({
  remUnit: 16, // 基准大小 baseSize，需要和rem.js中相同
});

module.exports = {
  pages: pagesObj, //多入口
  lintOnSave: false,
  // publicPath: publicPath,
  configureWebpack: {
    plugins: plugins,
  },
  devServer: {
    port: 9998, // 端口号
    disableHostCheck: true,
    // https://comm.wedengta.com/?s=quote&f=getSimpleQuote&req=QuoteReq&rsp=QuoteSimpleRsp
    proxy: {
      "/comm": {
        target: " https://comm.wedengta.com",
        secure:true,
        changeOrigin: true,
        pathRewrite:{
          '^/comm':'/'
        }
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      },
    },
  },
};

const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  devServer: {
    proxy: "http://120.79.103.100:8080"
  },
  lintOnSave: false,
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: "#FF695C",
          blue: "#FF695C",
          orange: "#FF695C",
          grey: "#aaa",
          yellow: "#FF9D5C",
          "text-color": "#333",
          "border-color": "#E7E7E7",
          "background-color": "#F4F4F4",
          "dialog-confirm-button-text-color": "#333"
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ["van-circle__layer"]
          })
        ]
      }
    }
  }
};

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {  //配置代理服务器
    proxy: {
      "/local": {
        target: "http://127.0.0.1:3000",
      },
    },
  },
})

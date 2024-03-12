const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000'
var path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : path.resolve("../server/public"),
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
        ws: false, // ws = 웹소켓 - 기본 사용으로 되어있음. 받는쪽과 보내는쪽 둘다 있어야하기에 false로 설정.
        pathRewrite: { '^/api':'/' } // /api 를 / 로 교체
      }
    }
  }
})

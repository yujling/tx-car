var webpack = require("webpack") // 1. 确保引入 webpack，后面会用到
module.exports = {
  presets: [
    '@vue/app'
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
     
    ],
    alias: {
     
     // 2. 定义别名和插件位置
     'jquery': 'jquery'
    }
   },
   plugins: [
    // 3. 配置全局使用 jquery
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
   ]
}
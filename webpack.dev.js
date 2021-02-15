const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "react/app.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true,
    proxy: {
      '/api': 'http://localhost:9001',
      '/app': 'http://localhost:9001',
    },
    writeToDisk: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
});


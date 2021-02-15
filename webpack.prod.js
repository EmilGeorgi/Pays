const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(__dirname, "../public/dist"),
    publicPath: "/dist/",
    filename: "react/app.js"
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['react/*'],
      cleanAfterEveryBuildPatterns: ['react/*']
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "../public"), to: path.join(__dirname, "public") },
        { from: path.join(__dirname, "src/index.html"), to: path.join(__dirname, "public/index.html") }
      ]
    })
  ]
})
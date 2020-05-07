/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'sr6sheet.html'),
    historyApiFallback: {
      index: '/',
    },
    publicPath: '/',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: "$sheet-namespace: '';",
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'sr6sheet.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!pug-loader!./src/pug/dev.pug',
      inject: true,
    })
  ]
});

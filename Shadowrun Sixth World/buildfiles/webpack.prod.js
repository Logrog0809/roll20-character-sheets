const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              prependData: '$sheet-namespace: \'sheet-\';',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'sr6sheet.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'sr6sheet.html',
      template: '!!pug-loader!./src/pug/main.pug?pretty=true',
      inject: false,
      minify: {
        removeRedundantAttributes: false
      }
    })
  ]
});

const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/styles/sr6sheet.scss'),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: [path.resolve(__dirname, 'src/pug/dev.pug'), path.resolve(__dirname, 'src/pug/main.pug')],
        loader: 'pug-loader',
        options: {
          doctype: 'html5'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './build')
  }
};

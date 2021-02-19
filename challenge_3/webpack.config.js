const path = require('path');
const SRC_DIR = path.join(__dirname, 'client', 'index.js');
const OUT_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: SRC_DIR,
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}
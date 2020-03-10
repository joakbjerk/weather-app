const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

module.exports = env => ({
  entry: [path.resolve(srcPath, './js/app.js'), path.resolve(srcPath, './scss/styles.scss')],
  output: {
    filename: 'js/[name].bundle.js',
    path: distPath,
    publicPath: '/'
  },
  devtool: env.mode === 'dev' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({ template: path.resolve(srcPath, './index.html') })
  ],

  devServer: {
    open: true,
    writeToDisk: true,
    contentBase: distPath
  }
});

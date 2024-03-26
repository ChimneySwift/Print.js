const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  devServer: {
    static: {
      directory: __dirname
    },
    port: 8080
  },
  output: {
    library: 'printJS',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'print.js',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'print.css'
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      (compiler) => {
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            mangle: true,
            ie8: true,
            safari10: true
          }
        }).apply(compiler)
      }
    ]
  }
}

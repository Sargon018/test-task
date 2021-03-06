const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let isDevMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './client/index',
  mode: isDevMode ? 'development' : 'production',
  devtool: isDevMode ? 'source-map' : false,
  target: isDevMode ? 'web' : 'browserslist',

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: !isDevMode ? [
      new TerserWebpackPlugin()
    ] : [],
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist',
    hot: isDevMode,
    open: true,
    historyApiFallback: true,
  }
}
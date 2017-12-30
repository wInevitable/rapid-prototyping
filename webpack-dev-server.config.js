require('dotenv').config({ path: './config.env' })

const alias = require('./alias')
const path = require('path')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const webpack = require('webpack')

const buildPath = path.resolve(__dirname, 'build')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const testPath = path.resolve(__dirname, 'test')

const config = {
  devServer: {
    contentBase: 'src/www',
    devTool: 'eval',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    port: 3000
  },
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  eslint: {
    configFile: '.eslintrc',
    fix: true,
  },
  module: {
    loaders: [
      {
        exclude: [nodeModulesPath],
        loaders: ['react-hot', 'babel-loader'],
        test: /\.js$/,
      },
      {
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        ],
        test: /\.(gif|png|jpe?g|svg)$/i,
      },
      {
        loader: 'file',
        test: /\.jpg$/,
      },
      {
        loader: "style-loader!css-loader",
        test: /\.css$/,
      },
      {
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/,
      },
      {
        loader: 'file?name=fonts/[name]/[name].[ext]',
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
      },
    ],
    preLoaders: [
      {
        exclude: [ nodeModulesPath, testPath ],
        loaders: ['eslint'],
        test: /\.js$/,
      }
    ],
  },
  node: {
    fs: "empty"
  },
  output: {
    chunkFilename: '[name].chunk.js',
    filename: 'app.js',
    path: buildPath,
    publicPath: '/',
  },
  plugins: [
    new TransferWebpackPlugin(
      [
        {
          from: 'www'
        },
      ],
      path.resolve(__dirname, 'src')
    ),
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify({
        API_KEY: process.env.API_KEY,
        FACEBOOK_SCOPES: process.env.FACEBOOK_SCOPES,
        HEAP_API_KEY: process.env.HEAP_API_KEY,
        NODE_ENV: process.env.NODE_ENV,
        PROJECT_ID: process.env.PROJECT_ID,
        PROJECT_ID_FOR_BUCKET: process.env.PROJECT_ID_FOR_BUCKET,
        SENTRY_API_KEY: process.env.SENTRY_API_KEY,
      })
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ],
  resolve: { alias },
}

module.exports = config

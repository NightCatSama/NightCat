var path = require('path')
var utils = require('./utils')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SentryWebpackPlugin = require('@sentry/webpack-plugin');


var webpackConfig = merge(baseWebpackConfig, {
  module : {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract  : true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output : {
    path         : config.build.assetsRoot,
    filename     : utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    // Tell webpack to minimize the bundle using the UglifyjsWebpackPlugin.
    minimize    : true,
    // 该配置用于实现代码分割，取代了曾经的CommonsChunkPlugin插件
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks : {
      chunks                : 'async',
      minSize               : 30000,
      maxSize               : 0,
      minChunks             : 1,
      maxAsyncRequests      : 5,
      maxInitialRequests    : 3,
      automaticNameDelimiter: '~',
      name                  : true,
      cacheGroups           : {
        vendors: {
          test    : /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks         : 2,
          priority          : -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {name: 'runtime'},
    // 只要在编译时出现错误，就使用noEmitOnErrors属性来跳过emit 阶段，用来替代NoEmitOnErrorsPlugin 插件
    // noEmitOnErrors: true,
    // 使用可读的模块标识，方便更好的调试。webpack在开发模式下默认开启，生产模式下默认关闭，用来替代 NamedModulesPlugin 插件
    // namedModules: true,
    // 缺省值为false, 表示每个入口块默认内嵌runtime代码
  },
  plugins     : [
    // 取代extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename : utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename      : config.build.index,
      template      : 'index.html',
      inject        : true,
      minify        : {
        removeComments       : true,
        collapseWhitespace   : true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from  : path.resolve(__dirname, '../static'),
        to    : config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new SentryWebpackPlugin ({
      release: process.env.RELEASE,
      include: './dist',
      ignore : ['node_modules']
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset    : '[path].gz[query]',
      algorithm: 'gzip',
      test     : new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio : 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

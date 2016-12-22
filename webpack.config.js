var path = require('path');
var autoprefixer = require('autoprefixer');
var SRC_PATH = path.resolve(__dirname, 'src');

var config = {
  devtool: 'inline-source-map',
  context: SRC_PATH,
  entry: {
    main: './main.js',
    html: './index.html'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },{
      test: /\.jsx?$/,
      loader: 'babel',
      include: SRC_PATH
    },{
      test: /\.(scss|css)$/,
      loaders: ['style', 'css?sourceMap', 'postcss', 'sass'],
    },{
      test: /\.eot/,loader : 'file?prefix=font/'},
      {test: /\.woff/,loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf/, loader : 'file?prefix=font/'},
      {test: /\.svg/, loader : 'file?prefix=font/'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  postcss:[
    autoprefixer({
      browsers: ['>0%']
    })
  ]
};

module.exports = config;
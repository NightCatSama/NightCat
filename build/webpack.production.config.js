var path = require('path')
var webpack = require('webpack')
var SRC_PATH = path.resolve(__dirname, '../src')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var autoprefixer = require('autoprefixer')
var utils = require('./utils')

var config = {
	devtool: false,
	entry: {
		app: './src/main.js',
	},
	output: {
		path: './dist',
		publicPath: './',
		filename: utils.assetsPath('js/[name].bundle.js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
		}, {
			test: /\.(scss|css)$/,
			loaders: ['style', 'css', 'postcss', 'sass'],
			exclude: /node_modules/
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss'],
		alias: {
			'actions': path.join(SRC_PATH, './actions'),
			'asset': path.join(SRC_PATH, './asset'),
			'components': path.join(SRC_PATH, './components'),
			'constants': path.join(SRC_PATH, './constants'),
			'images': path.join(SRC_PATH, './images'),
			'reducers': path.join(SRC_PATH, './reducers'),
			'router': path.join(SRC_PATH, './router'),
			'routes': path.join(SRC_PATH, './routes'),
			'store': path.join(SRC_PATH, './store'),
			'stylesheets': path.join(SRC_PATH, './stylesheets')
		},
		fallback: [path.join(__dirname, '../node_modules')]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', utils.assetsPath('js/vendors.js')),
		new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				minifyCSS: true
			}
		})
	],
	postcss: [
		autoprefixer({
			browsers: ['>0%']
		})
	]
}

module.exports = config
var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var SRC_PATH = path.resolve(__dirname, 'src')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
	devtool: 'inline-source-map',
	entry: {
		app: './src/main.js'
	},
	output: {
		path: './dist',
		publicPath: 'http://localhost:8080/',
		filename: 'js/[name].bundle.js',
   		chunkFilename: 'js/[name].[chunkhash].js'
	},
	module: {
		loaders: [{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.(wav|mp3)$/,
			loader: 'url-loader'
		}, {
			test: /\.jsx?$/,
			loader: 'babel',
			include: SRC_PATH
		}, {
			test: /\.(scss|css)$/,
			loaders: ['style', 'css?sourceMap', 'postcss', 'sass'],
		}, {
			test: /\.eot/,
			loader: 'file?prefix=font/'
		}, {
			test: /\.woff/,
			loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.ttf/,
			loader: 'file?prefix=font/'
		}, {
			test: /\.svg/,
			loader: 'file?prefix=font/'
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.css', '.scss']
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	postcss: [
		autoprefixer({
			browsers: ['>0%']
		})
	]
}

module.exports = config
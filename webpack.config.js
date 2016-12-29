var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var SRC_PATH = path.resolve(__dirname, 'src')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
	devtool: 'inline-source-map',
	// context: SRC_PATH,
	entry: {
		app: './src/main.js'
		// html: './index.html'
	},
	output: {
		path: './dist',
		publicPath: '/',
		// filename: 'bundle.js'
		filename: '[name].bundle.js',
   		chunkFilename: '[name].[chunkhash].js'
	},
	module: {
		loaders: [{
			test: /\.html$/,
			loader: 'file?name=[name].[ext]'
		}, {
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
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './index.html',
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
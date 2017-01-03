var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var SRC_PATH = path.resolve(__dirname, '../src')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var utils = require('./utils')

var config = {
	devtool: 'inline-source-map',
	entry: {
		app: './src/main.js'
	},
	output: {
		path: './dist',
		publicPath: 'http://localhost:8080/',
		filename: 'static/js/[name].js',
   		chunkFilename: 'static/js/[id].[chunkhash:5].js'
	},
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			loader: 'eslint',
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.(wav|mp3)$/,
			loader: 'url-loader',
			exclude: /node_modules/
		}, {
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.(scss|css)$/,
			loaders: ['style', 'css?sourceMap', 'postcss', 'sass'],
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
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			},
			sourceMap: true
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true
		})
	],
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
	devServer: {
		historyApiFallback: true,
		hot: true,
		colors: true,
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
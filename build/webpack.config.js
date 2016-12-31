var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var SRC_PATH = path.resolve(__dirname, '../src')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
	devtool: 'inline-source-map',
	entry: {
		app: './src/main.js'
	},
	output: {
		path: './dist',
		publicPath: 'http://localhost:8080/',
		filename: 'static/js/[name].bundle.js',
   		chunkFilename: 'static/js/[name].[chunkhash].js'
	},
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			loader: 'eslint',
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192',
			exclude: /node_modules/
		}, {
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
			test: /\.eot/,
			loader: 'file?prefix=font/',
			exclude: /node_modules/
		}, {
			test: /\.woff/,
			loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff',
			exclude: /node_modules/
		}, {
			test: /\.ttf/,
			loader: 'file?prefix=font/',
			exclude: /node_modules/
		}, {
			test: /\.svg/,
			loader: 'file?prefix=font/',
			exclude: /node_modules/
		}]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
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
		// new webpack.NoErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
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
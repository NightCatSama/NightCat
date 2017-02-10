import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import config from './config'
import errorhandler from 'errorhandler'
import connect from 'connect-mongo'
import logger from './common/logger'
import hbs from 'express-hbs'

import router from './routes'
import admin_router from './routes/admin'

const app = express()
const MongoStore = connect(session)

const relative = (_path) => path.relative(__dirname, _path)

 /*  使用hbs模板引擎  */
app.engine('hbs', hbs.express4({
	partialsDir: relative('./backstage/partials'),
	defaultLayout: relative('./backstage/layout/default.hbs')
}))
app.set('view engine', 'hbs')

 /*  前后端的文件public路径  */
app.set('back_static_views', relative('./backstage/dist'))
app.set('back_views', relative('./backstage/public'))
app.set('frone_views', relative('./views/dist/'))

app.use(favicon(relative('favicon.ico')))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(cookieParser(config.session_secret))

app.use(session({
	secret: config.session_secret,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		url: `mongodb://${config.db_host}:${config.db_port}/${config.db}`,
	}),
	cookie: {
		maxAge: 30 * 60 * 60 * 1000
	}
}))

app.use('/admin/', admin_router)
app.use('/', router)

// error handler
if (config.debug) {
	app.use(errorhandler())
}
else {
	app.use(function(err, req, res, next) {
		logger.error(err)
		return res.status(500).json({
			success: false,
			message: err
		})
	})
}

app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})
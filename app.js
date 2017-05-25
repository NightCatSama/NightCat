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
import compression from 'compression'

import router from './routes'
import admin_router from './routes/admin'

import socket from './socket'

const app = express()

/*  开启Gzip压缩  */
app.use(compression())

const MongoStore = connect(session)

const relative = (_path) => path.relative(__dirname, _path)

 /*  静态文件路径  */
app.set('frone_views', relative('./view/dist/'))

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
		url: `mongodb://${process.env.NODE_ENV === 'production' ? `${config.database.username}:${config.database.password}@` : ''}${config.db_host}:${config.db_port}/${config.db}`,
	}),
	cookie: {
		maxAge: 30 * 60 * 60 * 1000
	}
}))

/* front end */
app.use(express.static(app.get('frone_views')))
app.use('/admin', admin_router)
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

const server = app.listen(config.port, function() {
	console.log(`The server is already started, Listen on port ${config.port}!`)
})

socket(server)
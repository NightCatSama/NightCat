import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import config from './config'
import errorhandler from 'errorhandler'
import connect from 'connect-mongo'
import logger from './common/logger'

import router from './routes'

const app = express()
const MongoStore = connect(session)

app.set('views', path.join(__dirname, 'views/dist'))
//app.use(favicon(path.join(__dirname, 'favicon.ico')))

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
		maxAge: 180 * 60 * 1000
	}
}))

// app.use('/', routes)
router(app)

// error handler
if (config.debug) {
	app.use(errorhandler())
} else {
	app.use(function(err, req, res, next) {
		logger.error(err)
		return res.status(500).send('500 status')
	})
}

app.listen(config.port, function() {
	console.log(`Listen on port ${config.port}!`)
})
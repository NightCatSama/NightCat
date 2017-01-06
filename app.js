import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import config from './config'
import connect from 'connect-mongo'

import router from './routes'

const app = express()
const MongoStore = connect(session)

app.use(session({
  secret: 'nightcat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: `mongodb://${config.host}:${config.port}/${config.db}`,
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  } //store保存时间
}))

app.set('views', path.join(__dirname, 'views/dist'))
//app.use(favicon(path.join(__dirname, 'favicon.ico')))

/*  设置静态根目录  */
// app.use(express.static(path.join(__dirname, 'views/dist')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// app.use('/', routes)
router(app)

app.listen(80, function(){
    console.log('Listen on port 80!')
})

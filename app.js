import bodyParser from 'body-parser'
import compression from 'compression'
import connect from 'connect-mongo'
import cookieParser from 'cookie-parser'
import errorhandler from 'errorhandler'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import session from 'express-session'
import { buildSchema, graphql } from 'graphql'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import logger from './common/logger'
import config from './config'
import schema from './graphQL'
import { getRootValue } from './middlewares/graphql'
import { allowCrossDomain } from './middlewares/response'
import { User } from './proxy'
import router from './routes'
import admin_router from './routes/admin'
import socket from './socket'

const app = express()
const relative = (_path) => path.relative(__dirname, _path)

/*  使用 Helmet  */
app.use(helmet())

/*  开启Gzip压缩  */
app.use(compression())

/*  网站图标  */
app.use(favicon(relative('favicon.ico')))

/*  打印请求日志  */
app.use(morgan('dev'))

/*  请求解析中间件  */
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/graphql' }))
app.use(bodyParser.urlencoded({ extended: true }))

/*  cookie 解析中间件  */
app.use(cookieParser(config.session_secret))

const MongoStore = connect(session)
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: `mongodb://${process.env.NODE_ENV === 'production' ? `${config.database.username}:${config.database.password}@` : ''}${config.db_host}:${config.db_port}/${config.db}`,
  }),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

/*  graphQL  */
app.use('/graphql', allowCrossDomain)
app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema,
  pretty: true,
  graphiql: true,
  rootValue: await getRootValue(request),
  formatError: (error) => ({
    name: error.path,
    message: error.message,
    locations: error.locations
  })
})))

/*  前端代码  */
app.use('/admin', admin_router)
app.use('/', router)

/*  Error Handle  */
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

/*  socket (暂时没用上)  */
// socket(server)

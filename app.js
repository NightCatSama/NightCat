import express from 'express'
// https://helmetjs.github.io/
import helmet from 'helmet'
import path from 'path'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import graphqlHTTP from 'express-graphql'
import config from './config'
import errorhandler from 'errorhandler'
// https://github.com/jdesboeufs/connect-mongo
// MongoDB session store for Express and Connect
import connect from 'connect-mongo'
import logger from './common/logger'
import compression from 'compression'

import router from './routes'
import admin_router from './routes/admin'

import { getRootValue } from './middlewares/graphql'
import { graphqlConnect, graphiqlExpress } from 'apollo-server-express';
import schema from './graphQL'
import opn from 'opn';

const app = express()
const relative = (_path) => path.relative(__dirname, _path)

/*  使用 Helmet  */
app.use(helmet())

/*  开启Gzip压缩  */
app.use(compression())

/*  静态文件路径  */
app.set('frone_views', relative('./view/dist/'))

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
    url: `mongodb://${process.env.NODE_ENV === 'production' ? 
        `${config.database.username}:${config.database.password}@` : 
        ''}${config.db_host}:${config.db_port}/${config.db}`,
  }),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

/*  前端代码  */
app.use(express.static(app.get('frone_views')))
app.use('/admin', admin_router)
app.use('/', router)

/*  graphQL  */
app.post('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: schema,
  pretty: true,
  rootValue: await getRootValue(request),
  graphql: true,
  formatError: (error) => ({
    name: error.path,
    message: error.message,
    locations: error.locations
  })
})))

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
  // 自动打开浏览器
  // opn(`${config.protocol}://${config.host}`)
})

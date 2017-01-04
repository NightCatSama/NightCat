var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var routes = require('./routes/index')

var app = express()

app.set('views', path.join(__dirname, 'views/dist'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', routes)

app.post('/aa', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('miao~')
})

app.use(express.static(path.join(__dirname, 'views/dist')))

app.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!')
})

const mongoose = require('mongoose');

process.env.NODE_ENV = 'production'

const config = require('../config');

console.log(config.mongodb.url);

connect()
  .on('error', console.error.bind(console, 'connection error:'))
  .on('disconnected', () => console.log('mongodb disconnected'))
  .once('open', () => console.log('connect success'));

function connect() {
  mongoose.connect(config.mongodb.url);
  return mongoose.connection;
}

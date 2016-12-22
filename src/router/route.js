if (process.env.NODE_ENV === 'production') {
  module.exports = require('./route.prod');
} else {
  module.exports = require('./route.dev');
}
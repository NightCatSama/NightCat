// 这样就可以用import等es6语法了
// 这个是为了兼容低端浏览器，比如有的没有promise特性
require('babel-core/register')(
  {
    presets: ['stage-2', 'es2015']
  }
)

require('babel-polyfill')

process.env.NODE_ENV = 'development'
require('../tools/sync')

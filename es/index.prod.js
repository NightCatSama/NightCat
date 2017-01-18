require('babel-core/register')(
    {
        presets: ['stage-2', 'es2015']
    }
)

require('babel-polyfill')

process.env.NODE_ENV = 'production'
require('../app.js')
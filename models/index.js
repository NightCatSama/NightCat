import mongoose from 'mongoose'
import config from '../config'

import user from './user'

mongoose.Promise = global.Promise

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
    console.log(' =========== MongoDB Opened! ===========')
})

export {
	user
}
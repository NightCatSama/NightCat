import mongoose from 'mongoose'
import config from '../config'

import user from './user'

mongoose.Promise = global.Promise

let uri = `mongodb://${process.env.NODE_ENV === 'production' ? `${config.database.username}:${config.database.password}` : ''}@${config.db_host}:${config.db_port}/${config.db}`


console.log('=======================================')
console.log(uri)
mongoose.connect(uri)

let db = mongoose.connection
db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
    console.log(' =========== MongoDB is Opened! ===========')
})

export {
	user
}
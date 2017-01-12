import mongoose from 'mongoose'
import config from '../config'

import user from './user'

mongoose.Promise = global.Promise

let opt = {
	user: config.database.username,
	pass: config.database.password,
	auth: {
		authdb: 'admin'
	}
}

mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db}`)

let db = mongoose.connection
db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
    console.log(' =========== MongoDB is Opened! ===========')
})

export {
	user
}
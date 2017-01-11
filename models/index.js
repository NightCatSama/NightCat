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

// let connection = mongoose.createConnection(config.db_host, config.db, config.db_port, opt)

let db = mongoose.createConnection(`mongodb://${config.database.username}:${config.database.password}@${config.db_host}:${config.db_port}/${config.db}`)

db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
    console.log(' =========== MongoDB Opened! ===========')
})

export {
	user
}
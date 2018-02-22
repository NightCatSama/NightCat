import mongoose from 'mongoose'
import config from '../config'

import user from './user'
import article from './article'
import tag from './tag'
import comment from './comment'
import reply from './reply'
import link from './link'

mongoose.Promise = global.Promise

let uri = `mongodb://${config.database.password ? 
    `${config.database.username}:${config.database.password}@` : 
    ''}${config.db_host}:${config.db_port}/${config.db}`

mongoose.connect(uri)

let db = mongoose.connection
db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
  console.log(' =========== MongoDB is Opened! ===========')
})

export {
  user,
  article,
  tag,
  comment,
  reply,
  link
}
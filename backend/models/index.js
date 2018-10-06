import mongoose from 'mongoose'
import config from '../../config'

import user from './user'
import article from './article'
import tag from './tag'
import comment from './comment'
import reply from './reply'
import link from './link'

mongoose.Promise = global.Promise

mongoose.connect(config.mongodb.url)
mongoose.set('debug', config.mongodb.debug || false);

let db = mongoose.connection
db.on('error', console.error.bind(console, '【 connection error 】:'))
db.once('open', () => {
  console.log('=========== MongoDB is Opened! ===========')
})

export {
  user,
  article,
  tag,
  comment,
  reply,
  link
}

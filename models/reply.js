import mongoose from 'mongoose'
import md from '../common/markdown'

let Schema = mongoose.Schema

let replySchema = new Schema({
  // 评论 id
  comment_id: {
    type: Schema.Types.ObjectId
  },
  // 回复人账号
  target_account: {
    type: String
  },
  // 账号
  account: {
    type: String
  },
  // 回复内容
  content: {
    type: String
  },
  // 回复时间
  created_at: {
    type: Date,
    default: Date.now
  }
})

replySchema.virtual('view').get(function () {
  return md.render(this.content)
})

let reply = mongoose.model('reply', replySchema)

export default reply
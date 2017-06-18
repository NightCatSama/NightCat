import mongoose from 'mongoose'
import md from '../common/markdown'

let Schema = mongoose.Schema

let commentSchema = new Schema({
  // 文章 id
  article_id: {
    type: Schema.Types.ObjectId
  },
  // 发表者
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  reply: [{
    type: Schema.Types.ObjectId,
    ref: 'reply'
  }],
  // 评论内容
  content: {
    type: String
  },
  // 评论时间
  created_at: {
    type: Date,
    default: Date.now
  }
})

commentSchema.virtual('view').get(function () {
  return md.render(this.content)
})

let comment = mongoose.model('comment', commentSchema)

export default comment
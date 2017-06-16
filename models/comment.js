import mongoose from 'mongoose'
import md from '../common/markdown'

let Schema = mongoose.Schema

let commentSchema = new Schema({
  // 文章 id
  article_id: {
    type: Schema.Types.ObjectId
  },
  // 评论人账号
  account: {
    type: String
  },
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
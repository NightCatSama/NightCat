import mongoose from 'mongoose'
import md from '../common/markdown'

let Schema = mongoose.Schema

let airicleSchema = new Schema({
  // 文章标题
  title        : {
    type: String
  },
  // 作者
  author       : {
    type: Schema.Types.ObjectId,
    ref : 'user'
  },
  // 标签
  tags         : [{
    type: Schema.Types.ObjectId,
    ref : 'tag'
  }],
  // 文章内容
  content      : {
    type: String
  },
  // 封面图
  cover        : {
    type: String
  },
  // 是否发布
  release      : {
    type: Boolean
  },
  is_draft      : {
    type: Boolean
  },
  // 评论数目
  comment_count: {
    type: Number
  },
  // 注册时间
  created_at   : {
    type   : Date,
    default: Date.now
  },
  // 更新时间
  update_at    : {
    type   : Date,
    default: Date.now
  }
})

airicleSchema.pre('save', (next) => {
  var now = new Date()
  airicleSchema.update_at = now
  next()
})

airicleSchema.virtual('view').get(function () {
  return md.render(this.content)
})

let article = mongoose.model('article', airicleSchema)

export default article

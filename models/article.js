import mongoose from 'mongoose'

let Schema = mongoose.Schema

let airicleSchema = new Schema({
  // 文章标题
  name: {
    type: String
  },
  // 作者
  author: {
    type: String
  },
  // 标签
  tags: {
    type: Array
  },
  // 文章内容
  content: {
    type: String
  },
  // 封面图
  cover: {
    type: String
  },
  // 注册时间
  created_at: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  update_at: {
    type: Date,
    default: Date.now
  }
})

airicleSchema.pre('save', (next) => {
  var now = new Date()
  airicleSchema.update_at = now
  next()
})

let article = mongoose.model('article', airicleSchema)

export default article
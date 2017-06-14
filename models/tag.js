import mongoose from 'mongoose'

let Schema = mongoose.Schema

let tagSchema = new Schema({
  // 标签名字
  name: {
    type: String
  },
  // 该标签下的文章
  article: {
    type: Array
  }
})

tagSchema.index({ name: 1 })

tagSchema.virtual('count').get(function () {
  return this.article.length
})

let tag = mongoose.model('tag', tagSchema)

export default tag
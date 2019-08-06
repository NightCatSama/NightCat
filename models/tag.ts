import { Document, Schema, model } from 'mongoose'
import { ITag } from 'interfaces/tag';

export interface ITagModule extends ITag, Document {
  count: number
}

let tagSchema = new Schema({
  // 标签名字
  name: {
    type: String
  },
  // 该标签下的文章
  article: [{
    type: Schema.Types.ObjectId,
    ref: 'article'
  }]
})

tagSchema.index({ name: 1 })

tagSchema.virtual('count').get(function () {
  return this.article.length
})

let tag = model<ITagModule>('tag', tagSchema)

export default tag
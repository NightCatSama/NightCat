import { Schema, Document, model } from 'mongoose'
import md from '../common/markdown'
import { IArticle } from 'interfaces/article';

export interface IArticleModel extends IArticle, Document {}

let articleSchema = new Schema<IArticleModel>({
  // 文章标题
  title: {
    type: String
  },
  // 作者
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 标签
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  // 文章内容
  content: {
    type: String
  },
  // 封面图
  cover: {
    type: String
  },
  // 是否发布
  release: {
    type: Boolean
  },
  // 评论数目
  comment_count: {
    type: Number
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

articleSchema.pre<IArticleModel>('save', function (next) {
  this.update_at = new Date()
  next()
})

articleSchema.virtual('view').get(function () {
  return md.render(this.content)
})

let article = model<IArticleModel>('article', articleSchema)

export default article
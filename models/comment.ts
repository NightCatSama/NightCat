import { Schema, Document, model } from 'mongoose'
import md from '../common/markdown'
import { IComment } from 'interfaces/comment'

export interface ICommentModel extends IComment, Document {
  view: string
}

let commentSchema = new Schema<ICommentModel>({
  // 文章 id
  article_id: {
    type: Schema.Types.ObjectId,
  },
  // 评论类型
  type: {
    type: String,
  },
  // 发表者
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // 回复者
  reply: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reply',
    },
  ],
  // 评论内容
  content: {
    type: String,
  },
  // 楼层
  floor: {
    type: Number,
  },
  // 评论时间
  created_at: {
    type: Date,
    default: Date.now,
  },
})

commentSchema.virtual('view').get(function() {
  return md.render(this.content)
})

let comment = model<ICommentModel>('comment', commentSchema)

export default comment

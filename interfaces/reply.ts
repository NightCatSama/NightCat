import { Schema } from 'mongoose'
import { IUser } from './user'

export interface IReply {
  // 评论 id
  comment_id: Schema.Types.ObjectId
  // 回复者
  target_user: IUser
  // 发表者
  user: IUser
  // 回复内容
  content: string
  // 回复时间
  created_at: Date
}

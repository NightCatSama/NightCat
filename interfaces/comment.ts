import { IArticle } from "./article";
import { IUser } from "./user";

export interface IComment {
  // 文章 id
  article_id: IArticle
  // 评论类型
  type: string
  // 发表者
  user: IUser
  // 回复者
  reply: IUser[]
  // 评论内容
  content: string
  // 楼层
  floor: Number
  // 评论时间
  created_at: Date
}
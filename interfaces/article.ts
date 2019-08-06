import { ITag } from "./tag";
import { IUser } from "./user";

export interface IArticle {
  // 文章标题
  title: string
  // 作者
  author: IUser
  // 标签
  tags: ITag[]
  // 文章内容
  content: string
  // 封面图
  cover: string
  // 是否发布
  release: boolean
  // 评论数目
  comment_count: number
  // 注册时间
  created_at: Date
  // 更新时间
  update_at: Date
}
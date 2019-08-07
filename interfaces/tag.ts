import { IArticle } from './article'

export interface ITag {
  // 标签名字
  name: string
  // 该标签下的文章
  article: IArticle[]
}

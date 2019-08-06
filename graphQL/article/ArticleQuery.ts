import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql/type'

import Pagination from '../pagination'

import ArticleType from './ArticleType'
import Article from '../../proxy/article'

let articlePagination = new Pagination({
  name: 'ArticleQuery',
  type: ArticleType,
})

let ArticleQuery = {
  article: {
    type: articlePagination.type,
    descriptions: '所有文章的数据，支持分页',
    args: {
      release: {
        type: GraphQLBoolean,
        description: '是否发布过的文章'
      },
      ...articlePagination.args
    },
    resolve: async(root, args) => {
      let data = await Article.getArticle(typeof args.release === 'boolean' ? {
        release: args.release
      } : null)

      return await articlePagination.resolve(data, args)
    }
  },


  getArticleById: {
    type: ArticleType,
    descriptions: '根据 id 获取文章',
    args: {
      id: {
        type: GraphQLID,
        description: '文章 ID'
      }
    },
    resolve: async(root, { id }) => {
      let data = await Article.getArticleById(id)

      if (!data) throw Error('未找到文章')

      return data
    }
  }
}

export default ArticleQuery
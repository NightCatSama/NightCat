// GraphQL
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import Pagination from '../pagination.js'

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
        descriptions: '是否发布过的文章'
      },
      ...articlePagination.args
    },
    resolve: async(root, args) => {
      let data = await Article.getArticle(typeof args.release === 'boolean' ? {
        release: args.release
      } : null)

      return await articlePagination.resolve(data, args)
    }
  }
}

export default ArticleQuery
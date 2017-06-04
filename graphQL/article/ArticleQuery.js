// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import Pagination from '../pagination.js'

import ArticleType from './ArticleType'
import Article from '../../proxy/article'

let articleTypePagination = new Pagination({
  name: 'ArticleQuery',
  type: ArticleType,
})

let ArticleQuery = {
  article: {
    type: articleTypePagination.type,
    descriptions: '所有文章的数据，支持分页',
    args: {
      ...articleTypePagination.args
    },
    resolve: async(root, args) => {
      let data = await Article.getArticle()

      return await articleTypePagination.resolve(data, args)
    }
  }
}

export default ArticleQuery
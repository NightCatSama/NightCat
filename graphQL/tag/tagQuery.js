// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import Pagination from '../pagination.js'

import TagType from './TagType'
import { Tag, Article } from '../../proxy'
import ArticleType from '../article/ArticleType'

let articlePagination = new Pagination({
  name: 'ArticleQueryByTag',
  type: ArticleType,
})

let TagQuery = {
  tags: {
    type: new GraphQLList(TagType),
    descriptions: '所有标签',
    resolve: async() => {
      return await Tag.getTags()
    }
  },


  articleByTag: {
    type: articlePagination.type,
    descriptions: '该标签下的所有文章的数据，支持分页',
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      ...articlePagination.args
    },
    resolve: async(root, args) => {
      let tag = await Tag.getTagByName(args.name)
      if (!tag) throw Error('标签不存在！')
      
      let data = Array.from((tag.article), async(id) => {
        return await Article.getArticleById(id)
      })

      return await articlePagination.resolve(data, args)
    }
  }
}


export default TagQuery
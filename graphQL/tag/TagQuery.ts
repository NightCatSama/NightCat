import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql/type'

import Pagination from '../pagination'

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
    resolve: async () => {
      return await Tag.getTags()
    },
  },

  articleByTagId: {
    type: articlePagination.type,
    descriptions: '该标签下的所有文章的数据，支持分页',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '标签id',
      },
      release: {
        type: GraphQLBoolean,
        description: '是否发布过的文章',
      },
      ...articlePagination.args,
    },
    resolve: async (root, args) => {
      let tag = await Tag.getTagById(args.id)
      if (!tag) throw Error('标签不存在！')

      let data = []
      for (let i = 0, len = tag.article.length; i < len; i++) {
        let id = tag.article[i]
        let article = await Article.getArticleById(id)

        if (
          typeof args.release === 'undefined' ||
          article.release === (args.release || false)
        ) {
          data.push(article)
        }
      }

      return await articlePagination.resolve(data, args)
    },
  },

  articleByTagName: {
    type: articlePagination.type,
    descriptions: '该标签下的所有文章的数据，支持分页',
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '标签名字',
      },
      release: {
        type: GraphQLBoolean,
        description: '是否发布过的文章',
      },
      ...articlePagination.args,
    },
    resolve: async (root, args) => {
      let tag = await Tag.getTagByName(args.name)
      if (!tag) throw Error('标签不存在！')

      let data = []
      for (let i = 0, len = tag.article.length; i < len; i++) {
        let id = tag.article[i]
        let article = await Article.getArticleById(id)

        if (
          typeof args.release === 'undefined' ||
          article.release === (args.release || false)
        ) {
          data.push(article)
        }
      }

      return await articlePagination.resolve(data, args)
    },
  },
}

export default TagQuery

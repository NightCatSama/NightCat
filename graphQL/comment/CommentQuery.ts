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

import CommentType from './CommentType'
import { Comment } from '../../proxy'

let commentPagination = new Pagination({
  name: 'CommentQueryByArticleId',
  type: CommentType,
})

let CommentQuery = {
  comments: {
    type: commentPagination.type,
    descriptions: '该文章下的评论',
    args: {
      article_id: {
        type: GraphQLID,
        description: '文章 id'
      },
      type: {
        type: GraphQLString,
        description: '类型名称'
      },
      ...commentPagination.args
    },
    resolve: async(root, args) => {
      let data = await Comment.getComments({
        article_id: args.article_id,
        type: args.type
      })

      return await commentPagination.resolve(data, args)
    }
  }
}


export default CommentQuery
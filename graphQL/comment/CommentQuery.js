import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import Pagination from '../pagination.js'

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
        type: new GraphQLNonNull(GraphQLString)
      },
      ...commentPagination.args
    },
    resolve: async(root, args) => {
      let data = await Comment.getComments({
        article_id: args.article_id
      })

      return await commentPagination.resolve(data, args)
    }
  }
}


export default CommentQuery
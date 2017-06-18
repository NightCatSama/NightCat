import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import { formatDate } from '../../common/utils'
import { getGravatar } from '../../common/sign'
import { Reply, User } from '../../proxy'
import replyType from '../reply/replyType'
import UserType from '../user/UserType'

let CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: '评论',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id'
    },
    article_id: {
      type: GraphQLID,
      description: '文章id'
    },
    user: {
      type: UserType,
      description: '评论人'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: '评论内容'
    },
    created_at: {
      type: GraphQLString,
      description: '评论时间',
      resolve: (root) => formatDate(root.created_at)
    },
    reply: {
      type: new GraphQLList(replyType),
      description: '回复列表'
    },
    view: {
      type: GraphQLString,
      description: '解析后的内容'
    }
  })
})

export default CommentType
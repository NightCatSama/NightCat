import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql/type'

import { formatDate } from '../../common/utils'
import { getAvatar } from '../../common/sign'
import { User } from '../../proxy'
import UserType from '../user/UserType'

let replyType = new GraphQLObjectType({
  name: 'Reply',
  description: '回复',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id'
    },
    comment_id: {
      type: GraphQLID,
      description: '评论id'
    },
    target_user: {
      type: UserType,
      description: '回复人'
    },
    user: {
      type: UserType,
      description: '发表人'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: '回复内容'
    },
    created_at: {
      type: GraphQLString,
      description: '回复时间',
      resolve: (root) => formatDate(root.created_at)
    },
    view: {
      type: GraphQLString,
      description: '解析后的内容'
    }
  })
})

export default replyType
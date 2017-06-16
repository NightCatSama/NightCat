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
import { User } from '../../proxy'

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
    target_account: {
      type: new GraphQLNonNull(GraphQLString),
      description: '回复人账号'
    },
    account: {
      type: new GraphQLNonNull(GraphQLString),
      description: '账号'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: '回复内容'
    },
    avatar: {
      type: new GraphQLNonNull(GraphQLString),
      description: '评论人头像',
      resolve: async(root) => {
        let user = await User.getUserByAccount(root.account)

        if (!user) return getGravatar(root.account)

        return user.avatar
      }
    },
    created_at: {
      type: GraphQLString,
      description: '回复时间',
      resolve: (root) => {
        return formatDate(root.created_at)
      }
    },
    view: {
      type: GraphQLString,
      description: '解析后的内容'
    }
  })
})

export default replyType
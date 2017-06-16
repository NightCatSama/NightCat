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
    account: {
      type: new GraphQLNonNull(GraphQLString),
      description: '评论人账号'
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: '评论内容'
    },
    created_at: {
      type: GraphQLString,
      description: '评论时间',
      resolve: (root) => {
        return formatDate(root.created_at)
      }
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
    reply: {
      type: new GraphQLList(replyType),
      description: '回复列表',
      resolve: async(root) => {
        return await Reply.getReplys({
          comment_id: root._id
        })
      }
    },
    view: {
      type: GraphQLString,
      description: '解析后的内容'
    }
  })
})

export default CommentType
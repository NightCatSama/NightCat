import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql/type'

import replyType from './replyType'
import { User, Reply, Comment } from '../../proxy'
import { sendEmailNotification } from '../../common/mail'

let replyMutation = {
  addReply: {
    type: replyType,
    description: '添加一条回复',
    args: {
      comment_id: {
        type: GraphQLID,
        description: '评论id',
      },
      target_user: {
        type: GraphQLID,
        description: '回复人',
      },
      content: {
        type: GraphQLString,
        description: '评论内容',
      },
    },
    resolve: async (root, { comment_id, target_user, content }) => {
      if (!root.user) throw Error('请先登录')
      if (!content) throw Error('回复内容不能为空')
      if (content.length > 200) throw Error('回复内容太长了')

      let { account } = root.user
      let reply = await Reply.newAndSave({
        comment_id,
        target_user,
        content,
        user: root.user._id,
      })

      let comment = await Comment.getCommentById(comment_id)
      let user = await User.getUserById(target_user)

      if (user.email && user.subscribe)
        sendEmailNotification(
          user.email,
          comment.article_id,
          user.account,
          comment.floor,
        )

      return await Reply.getReplyById(reply._id)
    },
  },
}

export default replyMutation

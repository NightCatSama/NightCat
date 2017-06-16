import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import replyType from './replyType'
import { Reply } from '../../proxy'

let replyMutation = {
  addReply: {
    type: replyType,
    description: '添加一条回复',
    args: {
      comment_id: {
        type: GraphQLID,
        description: '评论id'
      },
      target_account: {
        type: GraphQLString,
        description: '回复人'
      },
      content: {
        type: GraphQLString,
        description: '评论内容'
      }
    },
    resolve: async(root, { comment_id, target_account, content }) => {
      if (!root.user) throw Error('请先登录')
      if (!content) throw Error('回复内容不能为空')
      if (content.length > 200) throw Error('回复内容太长了')

      let { account } = root.user
      return await Reply.newAndSave({
        comment_id,
        target_account,
        content,
        account
      })
    }
  }
}


export default replyMutation

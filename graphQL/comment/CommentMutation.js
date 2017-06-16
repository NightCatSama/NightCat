import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import CommentType from './CommentType'
import { Comment } from '../../proxy'

let CommentMutation = {
  addComment: {
    type: CommentType,
    description: '添加一条评论',
    args: {
      article_id: {
        type: GraphQLID,
        description: '文章id'
      },
      content: {
        type: GraphQLString,
        description: '评论内容'
      }
    },
    resolve: async(root, { article_id, content }) => {
      if (!root.user) throw Error('请先登录')
      if (!content) throw Error('评论内容不能为空')
      if (content.length > 200) throw Error('评论内容太长了')

      let { account } = root.user
      return await Comment.newAndSave({
        article_id,
        content,
        account
      })
    }
  }
}


export default CommentMutation

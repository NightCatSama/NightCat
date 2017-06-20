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
import { Comment, Article } from '../../proxy'
import { sendEmailNotification } from '../../common/mail'

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

      let comment = await Comment.newAndSave({
        article_id,
        content,
        user: root.user._id
      })

      if (!comment) throw Error('评论失败')

      let art = await Article.getArticleById(article_id)
      let floor = await Comment.getCommentCount(article_id)

      if (art.author.email && art.author.active) sendEmailNotification(art.author.email, article_id, art.author.account, floor)

      return comment
    }
  }
}


export default CommentMutation

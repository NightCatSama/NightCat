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
    description: '添加一条文章评论',
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
      let floor = comment.floor

      if (art.author.email && art.author.subscribe) sendEmailNotification(art.author.email, article_id, art.author.account, floor)

      return comment
    }
  },


  addIndieComment: {
    type: CommentType,
    description: '添加一条特殊评论',
    args: {
      type: {
        type: GraphQLString,
        description: '评论类型'
      },
      content: {
        type: GraphQLString,
        description: '评论内容'
      }
    },
    resolve: async(root, { type, content }) => {
      if (!root.user) throw Error('请先登录')
      if (!content) throw Error('评论内容不能为空')
      if (content.length > 200) throw Error('评论内容太长了')

      let comment = await Comment.newIndieCommentAndSave({
        type,
        content,
        user: root.user._id
      })

      if (!comment) throw Error('评论失败')

      return comment
    }
  }
}


export default CommentMutation

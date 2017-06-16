import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Query & Mutations
import UserQuery from './user/UserQuery.js'
import UserMutation from './user/UserMutation.js'

import ArticleQuery from './article/ArticleQuery.js'
import ArticleMutation from './article/ArticleMutation.js'

import TagQuery from './tag/TagQuery.js'
import TagMutation from './tag/TagMutation.js'

import CommentQuery from './comment/CommentQuery.js'
import CommentMutation from './comment/CommentMutation.js'

import replyMutation from './reply/replyMutation.js'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: UserQuery.users,
      user: UserQuery.user,

      article: ArticleQuery.article,
      getArticleById: ArticleQuery.getArticleById,

      tags: TagQuery.tags,
      articleByTag: TagQuery.articleByTag,

      comments: CommentQuery.comments
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      login: UserMutation.login,
      loginByEmail: UserMutation.loginByEmail,
      register: UserMutation.register,
      logout: UserMutation.logout,
      setEmail: UserMutation.setEmail,
      setAdmin: UserMutation.setAdmin,
      setPassword: UserMutation.setPassword,
      removeUser: UserMutation.removeUser,

      addArticle: ArticleMutation.addArticle,
      deleteArticle: ArticleMutation.deleteArticle,
      updateArticle: ArticleMutation.updateArticle,
      releaseArticle: ArticleMutation.releaseArticle,

      addTag: TagMutation.addTag,
      removeTag: TagMutation.removeTag,

      addComment: CommentMutation.addComment,

      addReply: replyMutation.addReply
    }
  })
})

export default schema
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

import LinkQuery from './link/LinkQuery.js'
import LinkMutation from './link/LinkMutation.js'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: UserQuery.users,
      user: UserQuery.user,

      article: ArticleQuery.article,
      getArticleById: ArticleQuery.getArticleById,

      tags: TagQuery.tags,
      articleByTagId: TagQuery.articleByTagId,
      articleByTagName: TagQuery.articleByTagName,

      comments: CommentQuery.comments,

      links: LinkQuery.links
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      login: UserMutation.login,
      loginByEmail: UserMutation.loginByEmail,
      register: UserMutation.register,
      logout: UserMutation.logout,
      setAdmin: UserMutation.setAdmin,
      setPassword: UserMutation.setPassword,
      removeUser: UserMutation.removeUser,
      updateUser: UserMutation.updateUser,
      setSubscribe: UserMutation.setSubscribe,

      addArticle: ArticleMutation.addArticle,
      deleteArticle: ArticleMutation.deleteArticle,
      updateArticle: ArticleMutation.updateArticle,
      releaseArticle: ArticleMutation.releaseArticle,

      addTag: TagMutation.addTag,
      updateTag: TagMutation.updateTag,
      removeTag: TagMutation.removeTag,

      addComment: CommentMutation.addComment,

      addReply: replyMutation.addReply,

      addLink: LinkMutation.addLink,
      updateLink: LinkMutation.updateLink,
      removeLink: LinkMutation.removeLink
    }
  })
})

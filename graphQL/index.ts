import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql/type'

// Query & Mutations
import UserQuery from './user/UserQuery'
import UserMutation from './user/UserMutation'

import ArticleQuery from './article/ArticleQuery'
import ArticleMutation from './article/ArticleMutation'

import TagQuery from './tag/TagQuery'
import TagMutation from './tag/TagMutation'

import CommentQuery from './comment/CommentQuery'
import CommentMutation from './comment/CommentMutation'

import replyMutation from './reply/replyMutation'

import LinkQuery from './link/LinkQuery'
import LinkMutation from './link/LinkMutation'

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

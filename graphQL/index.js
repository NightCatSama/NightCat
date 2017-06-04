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

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: UserQuery.users,
      user: UserQuery.user,

      article: ArticleQuery.article,

      tags: TagQuery.tags
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      login: UserMutation.login,
      register: UserMutation.register,
      logout: UserMutation.logout,
      setEmail: UserMutation.setEmail,
      setAdmin: UserMutation.setAdmin,
      setPassword: UserMutation.setPassword,

      addArticle: ArticleMutation.addArticle,
      deleteArticle: ArticleMutation.deleteArticle,
      updateArticle: ArticleMutation.updateArticle,

      addTag: TagMutation.addTag,
      removeTag: TagMutation.removeTag
    }
  })
})

export default schema
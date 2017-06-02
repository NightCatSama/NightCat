import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

// Query & Mutations
import UserQuery from './user/UserQuery.js'
import UserMutation from './user/UserMutation.js'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: UserQuery.users,
      user: UserQuery.user
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
      setPassword: UserMutation.setPassword
    }
  })
})

export default schema
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
      resetName: UserMutation.resetName,
      removeUser: UserMutation.removeUser
    }
  })
})

export default schema
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql/type'

import { Reply, User } from '../../proxy'

let LinkType = new GraphQLObjectType({
  name: 'Link',
  description: '友联',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id',
    },
    name: {
      type: GraphQLString,
      description: '名字',
    },
    avatar: {
      type: GraphQLString,
      description: '头像',
    },
    bio: {
      type: GraphQLString,
      description: '简述',
    },
    link: {
      type: GraphQLString,
      description: '链接',
    },
  }),
})

export default LinkType

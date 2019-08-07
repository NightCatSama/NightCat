import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql/type'

import LinkType from './LinkType'
import { Link } from '../../proxy'

let LinkQuery = {
  links: {
    type: new GraphQLList(LinkType),
    descriptions: '所有友链',
    resolve: async (root, args) => {
      return await Link.getLinks()
    },
  },
}

export default LinkQuery

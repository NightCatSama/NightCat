// GraphQL
import {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import TagType from './TagType'
import Tag from '../../proxy/tag'

let TagQuery = {
  tags: {
    type: new GraphQLList(TagType),
    descriptions: '所有标签',
    resolve: async() => {
      return await Tag.getTags()
    }
  }
}


export default TagQuery
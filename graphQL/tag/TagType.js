import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql'

let TagType = new GraphQLObjectType({
  name: 'Tag',
  description: '标签',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id'
    },
    name: {
      type: GraphQLString,
      description: '标签名字'
    },
    article: {
      type: new GraphQLList(GraphQLString),
      description: '该标签下的文章'
    },
    count: {
      type: GraphQLInt,
      description: '该标签下的文章数量'
    }
  })
})

export default TagType
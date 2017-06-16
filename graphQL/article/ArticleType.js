import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import { formatDate } from '../../common/utils'

let ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: '文章',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id'
    },
    title: {
      type: GraphQLString,
      description: '文章标题'
    },
    author: {
      type: GraphQLString,
      description: '作者'
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: '标签'
    },
    content: {
      type: GraphQLString,
      description: '文章内容'
    },
    cover: {
      type: GraphQLString,
      description: '封面图'
    },
    release: {
      type: GraphQLBoolean,
      description: '是否发布'
    },
    comment_count: {
      type: GraphQLBoolean,
      description: '评论数目'
    },
    created_at: {
      type: GraphQLString,
      description: '注册时间',
      resolve: (root) => {
        return formatDate(root.created_at)
      }
    },
    update_at: {
      type: GraphQLString,
      description: '更新时间',
      resolve: (root) => {
        return formatDate(root.update_at)
      }
    },
    view: {
      type: GraphQLString,
      description: '解析后的内容'
    }
  })
})

export default ArticleType
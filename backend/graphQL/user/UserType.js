import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql'

import { formatDate } from '../../common/utils'

let UserType = new GraphQLObjectType({
  name: 'User',
  description: '用户信息',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'id'
    },
    account: {
      type: GraphQLString,
      description: '账号'
    },
    email: {
      type: GraphQLString,
      description: '邮箱'
    },
    subscribe: {
      type: GraphQLBoolean,
      description: '是否订阅消息邮件'
    },
    avatar: {
      type: GraphQLString,
      description: '头像'
    },
    profile: {
      type: GraphQLString,
      description: '概况'
    },
    location: {
      type: GraphQLString,
      description: '位置'
    },
    github: {
      type: GraphQLString,
      description: 'Github'
    },
    website: {
      type: GraphQLString,
      description: '个人网站'
    },
    admin: {
      type: GraphQLBoolean,
      description: '是否管理员'
    },
    superAdmin: {
      type: GraphQLBoolean,
      description: '是否超级管理员'
    },
    created_at: {
      type: GraphQLString,
      description: '注册时间',
      resolve: (root) => formatDate(root.created_at)
    }
  })
})

export default UserType
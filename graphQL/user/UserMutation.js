// GraphQL
import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import UserType from './UserType.js';
import User from '../../models/user.js';
import { getUsers, getUserByAccount } from '../../proxy/user.js'

let UserMutation = {
  // 修改名字
  resetName: {
    type: UserType,
    description: 'modify user name',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'user name'
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'user name'
      }
    },
    resolve: async(root, { account, name }) => {
      getUserByAccount(account)
      .then(user => {
        user.name = name
        return user.save()
      })
      .then((data) => {
        console.log('保存成了!')
      })
    }
  },

  // 重置密码
  setPassword: {
    type: UserType,
    description: 'modify user password',
    args: {
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'new password'
      }
    },
    resolve: async(user, { password }, req, res) => {
      console.log(res)
      if (!user) {
        throw Error('请先登录')
        return false
      }

      if (!user.resetPwd) {
        throw Error('无法修改密码')
        return false
      }

      user.resetPwd = false
      user.password = password
      user.save()

      return user
    }
  },


  // 移除用户
  removeUser: {
    type: UserType,
    description: 'remove user',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'user name'
      }
    },
    resolve: async(root, { account, name }) => {
      let result
      getUserByAccount(account)
      .then(user => {
        if (!user) {
          return user
        }
        result = user
        return user.remove()
      })
      .then((data) => {
        console.log('删除成了!')
      })

      return result
    }
  }
}


export default UserMutation

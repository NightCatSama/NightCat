import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'
import uuid from 'uuid'
import validator from 'validator'

import UserType from './UserType.js'
import User from '../../proxy/user.js'

// 更新 access_token, 保持单点登录
const updateToken = async(user, req) => {
  let token = uuid.v4()
  req.session.token = token
  req.session.is_admin = user.admin
  user.access_token = token
  return await user.save()
}

let UserMutation = {
  login: {
    type: UserType,
    description: '账号登录',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: '密码'
      }
    },
    resolve: async(root, { account, password }, req) => {
      if (!account || account === '') throw Error('账号不能为空')
      if (!password || password === '') throw Error('密码不能为空')

      let user = await User.getUserByAccount(account)

      if (!user) throw Error('账号不存在')
      if (user.password !== password) throw Error('密码错误')

      return await updateToken(user, req)
    }
  },


  register: {
    type: UserType,
    description: '账号注册',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: '密码'
      },
      repassword: {
        type: new GraphQLNonNull(GraphQLString),
        description: '再次输入密码'
      }
    },
    resolve: async(root, { account, password, repassword }) => {
      if ([account, password, repassword].some((v) => v === '')) throw Error('信息不完整')
      if (!validator.isByteLength(account, { min: 6, max: 20 })) throw Error('账号至少需要6个字符')
      if (!validator.isByteLength(password, { min: 6 })) throw Error('密码至少需要6个字符')
      if (!validator.isAlphanumeric(account)) throw Error('账号只能包含字母和数字')
      if (password !== repassword) throw Error('两次密码输入不一致')
      if (await User.getUserByAccount(account)) throw Error('账号已存在')

      let user = await User.newAndSave({
        account,
        password
      })

      if (!user) throw Error('注册失败')

      return user
    }
  },


  logout: {
    type: UserType,
    description: '退出登录',
    resolve: async(root, args, req) => {
      if (!root.user) throw Error('请先登录')

      req.session.destroy()
      root.user.access_token = ''
      return await root.user.save()
    }
  },


  setEmail: {
    type: UserType,
    description: '设置邮箱',
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: '邮箱'
      }
    },
    resolve: async(root, { email }, req) => {
      if (!root.user) throw Error('账号未登录')

      root.user.email = email
      return await root.user.save()
    }
  },


  setPassword: {
    type: UserType,
    description: '修改密码',
    args: {
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: '新密码'
      }
    },
    resolve: async(root, { password }, req) => {
      if (!root.user) throw Error('账号未登录')
      if (!root.user.resetPwd) throw Error('无法修改密码')

      user.resetPwd = false
      user.password = password

      return await user.save()
    }
  }
}


export default UserMutation

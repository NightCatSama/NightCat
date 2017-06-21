import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import validator from 'validator'
import { updateToken } from '../../common/sign'

import UserType from './UserType'
import User from '../../proxy/user'

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


  loginByEmail: {
    type: UserType,
    description: '邮箱登录',
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: '密码'
      }
    },
    resolve: async(root, { email, password }, req) => {
      if (!email || email === '') throw Error('邮箱不能为空')
      if (!password || password === '') throw Error('密码不能为空')
      if (!validator.isEmail(email)) throw Error('邮箱格式不对')

      let user = await User.getUserByEmail(email)

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
    resolve: async(root, { account, password, repassword }, req) => {
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

      return await updateToken(user, req)
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


  setAdmin: {
    type: UserType,
    description: '设置/取消 管理员',
    args: {
       account: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
      }
    },
    resolve: async(root, { account }, req) => {
      if (!root.user) throw Error('账号未登录')
      if (!root.user.superAdmin) throw Error('你没有超级管理员权限')

      let user = await User.getUserByAccount(account)

      if (user.superAdmin) throw Error('你没有权限')

      user.admin = !user.admin

      return await user.save()
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

      root.user.resetPwd = false
      root.user.password = password

      return await root.user.save()
    }
  },


  removeUser: {
    type: UserType,
    description: '删除用户',
    args: {
      account: {
        type: new GraphQLNonNull(GraphQLString),
        description: '账号'
      }
    },
    resolve: async(root, { account }, req) => {
      if (!root.user) throw Error('账号未登录')
      if (!root.user.superAdmin) throw Error('你没有超级管理员权限')

      let user = await User.getUserByAccount(account)

      return await user.remove()
    }
  },


  updateUser: {
    type: UserType,
    description: '更新用户资料',
    args: {
      avatar: {
        type: GraphQLString,
        description: '头像'
      },
      profile: {
        type: GraphQLString,
        description: '简介'
      },
      website: {
        type: GraphQLString,
        description: '个人网站'
      },
      github: {
        type: GraphQLString,
        description: 'github'
      },
      location: {
        type: GraphQLString,
        description: '地点'
      }
    },
    resolve: async(root, { avatar, profile, website, github, location }, req) => {
      if (!root.user) throw Error('请先登录')
      if (!validator.isByteLength(profile, { max: 200 })) throw Error('简介不能大于 200 个字符')
      if (website && !validator.isURL(website, { allow_underscores: true })) throw Error('请输入正确的URL')
      if (github && !validator.isURL(github, { allow_underscores: true })) throw Error('请输入正确的 Github 地址')
      if (!validator.isByteLength(location, { max: 99 })) throw Error('地点不能大于 99 个字符')

      root.user.avatar = avatar
      root.user.profile = profile
      root.user.website = website
      root.user.github = github
      root.user.location = location

      return await root.user.save()
    }
  }
}


export default UserMutation

import { Document, Schema, model } from 'mongoose'
import { IUser } from 'interfaces/user';

export interface IUserModel extends IUser, Document {}

let userSchema: Schema = new Schema<IUserModel>({
  // 账号
  account: {
    type: String
  },
  // 密码
  password: {
    type: String
  },
  // 邮箱
  email: {
    type: String
  },
  // 是否订阅消息回复
  subscribe: {
    type: Boolean,
    default: false
  },
  // 签名描述
  profile: {
    type: String,
    default: ''
  },
  // 头像
  avatar: {
    type: String
  },
  // 注册时间
  created_at: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  update_at: {
    type: Date,
    default: Date.now
  },
  // 个人网站地址
  website: {
    type: String,
    default: ''
  },
  // github
  github: {
    type: String,
    default: ''
  },
  // 位置
  location: {
    type: String,
    default: ''
  },
  // 令牌
  access_token: {
    type: String
  },
  // 是否管理员
  admin: {
    type: Boolean,
    default: false
  },
  // 是否超级管理员
  superAdmin: {
    type: Boolean,
    default: false
  },
  // 是否重置密码
  resetPwd: {
    type: Boolean,
    default: false
  }
})

userSchema.index({ account: 1 }, { unique: true, sparse: true })
userSchema.index({ access_token: 1 })

userSchema.pre<IUserModel>('save', function(next) {
  this.update_at = new Date()
  next()
})

let user = model<IUserModel>('user', userSchema)

export default user
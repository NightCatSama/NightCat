import md5 from 'md5'
import jwt from 'jsonwebtoken'
import uuid from 'uuid'
import config from '../config'

/*  生成默认头像  */
export const getAvatar = email => {
  return `https://www.gravatar.com/avatar/${md5(
    email,
  )}/?d=https://www.gravatar.com/avatar/9606f9cc7e486b4cc5c118b9c0ad1d48`
}

/*  jwt加密  */
export const signToken = payload => {
  return jwt.sign(payload, config.session_secret)
}

/*  jwt验证  */
export const verifyToken = token => {
  return jwt.verify(token, config.session_secret)
}

/*  返回用户信息  */
export const returnUserData = user => {
  return {
    account: user.account,
    email: user.email,
    location: user.location,
    github: user.github,
    website: user.website,
    profile: user.profile,
    gameData: user.gameData,
    admin: user.admin,
    avatar: user.avatar,
  }
}

// 更新 access_token, 保持单点登录
export const updateToken = async (user, req) => {
  let token = uuid.v4()
  req.session.token = token
  req.session.is_admin = user.admin
  user.access_token = token
  return await user.save()
}

export default {
  getAvatar,
  updateToken,
  signToken,
  verifyToken,
  returnUserData,
}

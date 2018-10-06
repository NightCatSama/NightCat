import { User } from '../proxy'
import md5 from 'md5'
import validator from 'validator'
import config from '../../config'
import { sendActiveMail } from '../common/mail'
import { randomPassword } from '../common/utils'
import { updateToken, returnUserData } from '../common/sign'

export default {
  /*  发送注册邮件  */
  sendSignupEmail: async(req, res, next) => {
    let { email } = req.body
    let account = ''
    let password = ''
    let access_token = req.session.token

    if (access_token) {
      let user = await User.getUserByAccessToken(access_token)
      account = user.account
      password = user.password
    }

    if (!validator.isEmail(email)) {
      res.status(403)
      return res.json({
        success: false,
        message: '邮箱格式不合法'
      })
    }

    if (await User.getUserByEmail(email)) {
      res.status(403)
      return res.json({
        success: false,
        message: '该邮箱已被绑定'
      })
    }

    if (req.session.email_cd && Date.now() - req.session.email_cd <= 60 * 1000) {
      res.status(403)
      return res.json({
        success: false,
        message: '一分钟内只可发送一次邮箱激活邮件'
      })
    }

    req.session.email_cd = Date.now()

    let key = account ? md5(account + password + email + config.session_secret) : md5(email + config.session_secret)
    let SITE_ROOT_URL = `${config.protocol}://${config.host}`
    let active_url = `${SITE_ROOT_URL}/activeEmail?key=${key}&email=${email}${account ? '&account=' + account : ''}`

    if (!await sendActiveMail(email, active_url, email)) {
      res.status(500)
      return res.json({
        success: false,
        message: '发送邮件失败，请重试'
      })
    }

    res.status(200)
    return res.json({
      success: true,
      message: '已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
    })
  },


  /*  激活邮箱  */
  activeEmail: async(req, res, next) => {
    let { key, email, account } = req.body
    let md5Key, user

    if (!validator.isEmail(email)) {
      res.status(403)
      return res.json({
        success: false,
        message: '邮箱格式不合法'
      })
    }

    // 账号存在时，则为邮箱激活，否则为邮箱注册
    if (account) {
      user = await User.getUserByAccount(account)

      if (!user) {
        res.status(403)
        return res.json({
          success: false,
          message: '账号不存在'
        })
      }

      md5Key = md5(account + user.password + email + config.session_secret)
    }
    else {
      md5Key = md5(email + config.session_secret)
    }

    if (md5Key !== key) {
      res.status(403)
      return res.json({
        success: false,
        message: '验证失败'
      })
    }

    // 当用户已存在时，则为激活邮箱
    if (account) {
      user.email = email
      await user.save()

      res.status(200)
      return res.json({
        success: true,
        message: '绑定成功',
        data: returnUserData(user)
      })
    }

    // 当用户不存在时，则使用邮箱注册
    let userInfo = {
      account: email,
      email: email,
      password: randomPassword(),
      resetPwd: true
    }

    user = await User.newAndSave(userInfo)
      .catch((err) => next(err))

    if (user) {
      await updateToken(user, req)

      res.status(200)
      return res.json({
        success: true,
        message: '注册成功',
        data: returnUserData(user)
      })
    }
  }
}

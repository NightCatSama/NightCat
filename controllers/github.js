import { User } from '../proxy'
import { updateToken } from '../common/sign'
import axios from 'axios'
import config from '../config'
import { randomPassword } from '../common/utils'

export default {
  /*  通过 Github 第三方登录  */
  signinByGithub: async(req, res, next) => {
    let { code, state } = req.query
    let { clientId, clientSecret } = config.github
    let access_token

    // 得到github的access_token
    await axios.post('https://github.com/login/oauth/access_token', {
      code,
      client_id: clientId,
      client_secret: clientSecret
    })
    .then((res) => {
       access_token = res.data.split('&')[0].split('=')[1]
    })
    .catch(err => {
      res.status(403)
      res.json({
        success: false,
        message: 'Github认证失败'
      })
    })

    // 根据access_token获取用户数据
    let userData = await axios.post('https://api.github.com/graphql', {
      query: `
        query {
          viewer {
            login,
            email,
            bio,
            url,
            avatarUrl,
            location
          }
        }
      `
    }, {
      headers: {
        Authorization: `bearer ${access_token}`
      }
    })
    .catch(err => next(err))

    userData = userData.data.data.viewer

    let user = await User.getUserByEmail(userData.email)
      .catch(err => next(err))

    // 判断邮箱是否已注册
    if (user) {
      await updateToken(user, req)

      return res.status(302)
        .redirect(`${state}`)
    }

    // 如果没有邮箱只能拜拜了
    if (!userData.email) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('请先在 github 中设置公开邮箱')
      return res.end()
    }

    let userInfo = {
      account: userData.email,
      email: userData.email,
      password: randomPassword(),
      resetPwd: true,
      profile: userData.bio,
      github: userData.url,
      avatar: userData.avatarUrl,
      location: userData.location
    }

    // 如果未注册则直接注册
    user = await User.newAndSave(userInfo)

    if (user) {
      await updateToken(user, req)

      return res.status(302)
        .redirect('/setPassword')
    }
  }
}
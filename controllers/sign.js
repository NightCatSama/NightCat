import { User } from '../proxy'
import md5 from 'md5'
import uuid from 'uuid'
import axios from 'axios'
import validator from 'validator'
import eventproxy from 'eventproxy'
import mail from '../common/mail'
import utils from '../common/sign'
import logger from '../common/logger'
import config from '../config'

export default {
	// github登录
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
						name,
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

		let user = await User.getUserByAccount(userData.login)
			.catch(err => next(err))

		let token = uuid.v4()
		// 判断用户名是否已注册
		if (user) {
			req.session.token = token
			req.session.is_admin = user.admin
			user.access_token = token
			user.save()

			return res.status(302)
				.redirect(`/${state}`)
		}

		let userInfo = {
			name: userData.name,
			account: userData.login,
			email: userData.email,
			password: '123456',
			resetPwd: true,
			active: true,
			profile: userData.bio,
			github: userData.url,
			avatar: userData.avatarUrl,
			location: userData.location,
			access_token: token
		}
		// 如果未注册则直接注册
		await User.newAndSave(userInfo)
		.then((user) => {
			req.session.token = token
			req.session.is_admin = user.admin

			return res.status(302)
				.redirect('/setPassword')
		})
	},


	activeAccount: async(req, res, next) => {
		let key = req.query.key
		let account = req.query.account

		var ep = new eventproxy()
		ep.fail(next)
		ep.on('active_account_result', (msg) => {
			res.status(200)
			res.json({
				success: false,
				message: msg
			})
		})
		User.getUserByAccount(account)
			.then((user) => {
				if (!user) {
					return ep.emit('active_account_result', '无效的账号')
				}
				if (md5(user.email + user.password + config.session_secret) !== key) {
					return ep.emit('active_account_result', '信息有误，账号无法激活')
				}
				if (user.active) {
					return ep.emit('active_account_result', '账号已被激活')
				}
				user.active = true
				user.save(err => {
					if (err) {
						return next(err)
					}
					return res.json({
						success: true,
						message: '激活成功'
					})
				})
			})
			.catch((err) => next(err))
	}
}
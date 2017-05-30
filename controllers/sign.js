import { User } from '../proxy'
import md5 from 'md5'
import axios from 'axios'
import validator from 'validator'
import eventproxy from 'eventproxy'
import mail from '../common/mail'
import utils from '../common/sign'
import logger from '../common/logger'
import config from '../config'

export default {

	/*  注册账号  */
	signup: async(req, res, next) => {
		let account = req.body.account
		let password = req.body.password
		let repassword = req.body.repassword

		let ep = new eventproxy()
		ep.fail(next)
		ep.on('signup_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if ([account, password, repassword].some((v) => v === '')) {
			return ep.emit('signup_err', '信息不完整')
		}
		if (!validator.isByteLength(account, { min: 6, max: 20 })) {
			return ep.emit('signup_err', '账号至少需要6个字符')
		}
		if (!validator.isByteLength(password, { min: 6 })) {
			return ep.emit('signup_err', '密码至少需要6个字符')
		}
		if (!validator.isAlphanumeric(account)) {
			return ep.emit('signup_err', '账号只能包含字母和数字')
		}
		if (password !== repassword) {
			return ep.emit('signup_err', '两次密码输入不一致')
		}
		if (await User.getUserByAccount(account)) {
			return ep.emit('signup_err', '账号已存在')
		}

		let md5pass = md5(md5(password))
		let userInfo = {
			account: account,
			password: md5pass
		}

		await User.newAndSave(userInfo)
			.then(() => {
				// mail.sendActiveMail(email, md5(email + md5pass + config.session_secret), account)
				return res.json({
					success: true,
					message: '注册成功'
					// message: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。',
				})
			})
			.catch((err) => {
				next(err)
			})
	},


	/*  登录账号  */
	signin: async(req, res, next) => {
		let account = req.body.account
		let password = req.body.password

		var ep = new eventproxy()
		ep.fail(next)
		ep.on('signin_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if (!account || account === '') {
			return ep.emit('signin_err', '账号不能为空')
		}
		if (!password || password === '') {
			return ep.emit('signin_err', '密码不能为空')
		}

		let userInfo = {
			account: account,
			password: md5(md5(password))
		}

		await User.getUserByAccount(account)
			.then((user) => {
				if (!user) {
					return ep.emit('signin_err', '账号不存在')
				}

				if (user.password !== userInfo.password) {
					return ep.emit('signin_err', '密码错误')
				}
				// else if (!user.active) {
				// 	// 重新发送激活邮件
				// 	mail.sendActiveMail(user.email, md5(user.email + user.password + config.session_secret), account)
				// 	res.status(403);
				// 	return ep.emit('signin_err', `此帐号还没有被激活，激活链接已发送到 ${user.email} 邮箱，请查收。`)
				// }
				else {
					let token = utils.signToken(user.account)
					req.session.token = token
					req.session.is_admin = user.admin
					return res.json({
						success: true,
						message: '登录成功',
						data: utils.returnUserData(user)
					})
				}
			})
			.catch((err) => next(err))
	},


	/*  github登录  */
	signinByGithub: async(req, res, next) => {
		let { code, state } = req.query
		let { clientId, clientSecret } = config.github
		let access_token

		//  得到github的access_token
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

		//  根据access_token获取用户数据
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
			}`
		}, {
			headers: {
				Authorization: `bearer ${access_token}`
			}
		})
		.catch(err => next(err))

		userData = userData.data.data.viewer

		//  判断用户名是否已注册
		let is_exist = false
		await User.getUserByAccount(userData.login)
		.then((user) => {
			if (user) {
				is_exist = true
				let token = utils.signToken(user.account)
				req.session.token = token
				req.session.is_admin = user.admin

				return res.status(302)
					.redirect(`/${state}`)
			}
		})
		.catch(err => next(err))

		if (is_exist) {
			return false
		}

		let userInfo = {
			name: userData.name,
			account: userData.login,
			email: userData.email,
			password: '123456',
			resetPwd: true,
			active: true,
			profile: userData.bio,
			github: userData.html_url,
			avatar: userData.avatar_url,
			location: userData.location
		}
		//  如果未注册则直接注册
		await User.newAndSave(userInfo)
		.then((user) => {
			let token = utils.signToken(user.account)
			req.session.token = token
			req.session.is_admin = user.admin
			
			return res.status(302)
				.redirect('/setPassword')
		})
	},


	/*  退出登录  */
	signout: async(req, res, next) => {
		req.session.destroy()
		res.json({
			success: true,
			message: '退出登录成功'
		})
	},


	/*  重置密码  */
	resetPwd: async(req, res, next) => {
		let newPwd = req.body.password
		let access_token = req.header.access_token
	},


	/*  认证是否登录  */
	verify: async(req, res, next) => {
		let token = req.session.token
		await utils.verifyToken(token)
		.then((account) => User.getUserByAccount(account))
		.then((user) => {
			req.session.token = token
			res.json({
				success: true,
				message: '登录成功',
				data: utils.returnUserData(user)
			})
		})
		.catch(err => {
			res.status(403)
			res.json({
				success: false,
				message: '认证失败'
			})
		})
	},


	/*  激活账号  */
	activeAccount: async(req, res, next) => {
		let key = req.query.key
		let account = req.query.account

		var ep = new eventproxy()
		ep.fail(next)
		ep.on('active_account_result', (msg, bool) => {
			res.status(200)
			res.json({
				success: !!bool,
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
					return ep.emit('active_account_result', '激活成功!', true)
				})
			})
			.catch((err) => next(err))
	}
}
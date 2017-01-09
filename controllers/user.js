// import { user } from '../models'
import { User } from '../proxy'
import md5 from 'md5'
import validator from 'validator'
import eventproxy from 'eventproxy'
import jwt from 'jsonwebtoken'
import mail from '../common/mail'
import config from '../config'

export default {
	/*  Test  */
	test: async(req, res, next) => {
		res.json({
			success: true,
			message: 'test'
		})
	},
	/*  注册账号  */
	signup: async(req, res, next) => {
		let account = req.body.account
		let password = req.body.password
		let repassword = req.body.repassword
		let email = req.body.email

		let ep = new eventproxy()
		ep.fail(next)
		ep.on('signup_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if ([account, password, repassword, email].some((v) => v === '')) {
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
		if (!validator.isEmail(email)) {
			return ep.emit('signup_err', '邮箱不合法')
		}
		if (password !== repassword) {
			return ep.emit('signup_err', '两次密码输入不一致')
		}

		await User.getUserByAccount(account)
			.then(data => {
				if (data) {
					return ep.emit('signup_err', '账号已存在')
				}
			})
			.catch(() => {
				return ep.emit('signup_err', '查询数据库失败', 500)
			})

		await User.getUserByEmail(email)
			.then(data => {
				if (data) {
					return ep.emit('signup_err', '邮箱已被注册')
				}
			})
			.catch(() => {
				return ep.emit('signup_err', '查询数据库失败', 500)
			})

		let md5pass = md5(md5(password))
		let userInfo = {
			account: account,
			password: md5pass,
			email: email
		}

		await User.newAndSave(userInfo)
			.then((data) => {
				mail.sendActiveMail(email, md5(email + md5pass + config.session_secret), account)
				return res.json({
					success: true,
					message: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。',
				})
			})
			.catch((err) => {
				next(err)
				return ep.emit('signup_err', '【newAndSave】查询数据库失败', 500)
			})
	},
	/*  登录账号  */
	signin: async(req, res, next) => {
		let account = req.body.account
		let password = req.body.password

		var ep = new eventproxy()
		ep.fail(next)
		ep.on('login_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if (!account || account === '') {
			return ep.emit('login_err', '账号不能为空')
		}
		if (!password || password === '') {
			return ep.emit('login_err', '密码不能为空')
		}

		let userInfo = {
			account: account,
			password: md5(md5(password))
		}

		await User.getUserByAccount(account)
			.then(data => {
				if (!data) {
					return ep.emit('login_err', '账号不存在')
				}
				else {
					if (data.password !== userInfo.password) {
						return ep.emit('login_err', '密码错误')
					} 
					else if (!data.active) {
						// 重新发送激活邮件
						mail.sendActiveMail(data.email, md5(data.email + data.password + config.session_secret), account)
						res.status(403);
						return ep.emit('login_err', `此帐号还没有被激活，激活链接已发送到 ${data.email} 邮箱，请查收。`)
					}
					else {
						let token = jwt.sign(data.account, config.session_secret)
						req.session.token = token
						return res.json({
							success: true,
							message: '登录成功',
							token: token
						})
					}
				}
			})
			.catch((err) => {
				next(err)
				return ep.emit('signup_err', '查询数据库失败', 500)
			})
	},
	/*  激活账号  */
	activeAccount: async(req, res, next) => {
		let key = req.query.key
		let account = req.query.account

		var ep = new eventproxy()
		ep.fail(next)
		ep.on('active_account_result', (msg, status = 200) => {
			res.status(status)
			res.json({
				success: true,
				message: msg
			})
		})
		
		User.getUserByAccount(account)
			.then(data => {
				if (!data) {
					return ep.emit('active_account_result', '无效的账号')
				}
				if (md5(data.email + data.password + config.session_secret) !== key) {
					return ep.emit('active_account_result', '信息有误，账号无法激活')
				}
				if (data.active) {
					return ep.emit('active_account_result', '账号已被激活')
				}
				data.active = true
				data.save(err => {
					if (err) {
						return ep.emit('active_account_result', '激活失败！')
					}
					return ep.emit('active_account_result', '激活成功!')
				})
			})
			.catch((err) => {
				ep.emit('active_account_result', '激活失败！')
			})
	}
}
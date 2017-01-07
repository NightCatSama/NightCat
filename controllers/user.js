import { user } from '../models'
import md5 from 'md5'
import validator from 'validator'
import eventproxy from 'eventproxy'
import jwt from 'jsonwebtoken'


export default {
	signup: async(req, res, next) => {
		let name = req.body.name
		let password = req.body.password
		let repassword = req.body.repassword
		let email = req.body.email

		var ep = new eventproxy();
		ep.fail(next)
		ep.on('signup_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if ([name, password, repassword, email].some((v) => v === '')) {
			return ep.emit('signup_err', '信息不完整')
		}
		if (!validator.isLength, { min: 6 }) {
			return ep.emit('signup_err', '用户名至少需要6个字符')
		}
		if (!validator.isAlphanumeric(name)) {
			return ep.emit('signup_err', '用户名只能包含字母和数字')
		}
		if (!validator.isEmail(email)) {
			return ep.emit('signup_err', '邮箱不合法')
		}
		if (password !== repassword) {
			return ep.emit('signup_err', '两次密码输入不一致')
		}

		let userInfo = {
			name: name,
			password: md5(md5(password)),
			email: email
		}

		await user.findOne({
				name: userInfo.name
			})
			.then(data => {
				if (data) {
					return ep.emit('signup_err', '用户名已存在')
				}
			})

		await user.findOne({
				email: userInfo.email
			})
			.then(data => {
				if (data) {
					return ep.emit('signup_err', '邮箱已被注册')
				}
			})

		await user.create(userInfo)
			.then(() => {
				return res.json({
					success: true,
					message: '注册成功',
				})
			})
			.catch(() => {
				return ep.emit('signup_err', '注册失败', 500)
			})
	},
	login: async(req, res) => {
		let name = req.body.name
		let password = req.body.password
		if (!name || name === '') {
			return res.json({
				success: false,
				message: '没有填写名字',
			})
		}
		if (!password || password === '') {
			return res.json({
				success: false,
				message: '没有填写密码',
			})
		}
		let userInfo = {
			name: name,
			password: md5(md5(password))
		}
		await user.findOne({
				name: userInfo.name
			})
			.then(response => {
				if (response !== null) {
					if (response.password !== userInfo.password) {
						return res.json({
							success: false,
							message: '密码错误',
						})
					} else {
						let token = jwt.sign(response.name, 'wanan')
						req.session.token = token
						return res.json({
							success: true,
							message: '登录成功',
							token: token
						})
					}
				} else {
					return res.json({
						success: false,
						message: '没有此账号',
					})
				}
			})
	}
}
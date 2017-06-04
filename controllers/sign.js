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
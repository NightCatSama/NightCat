import { User } from '../proxy'
import validator from 'validator'
import eventproxy from 'eventproxy'
// import { formatDate } from '../common/utils'
// import express from 'express'

export default {
	/*  根据AccessToken得到用户信息  */
	getUserInfo: async(req, res, next) => {
		let accessToken = req.query.accessToken

		let ep = new eventproxy()
		ep.fail(next)
		ep.on('get_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		await User.getUserByAccessToken(accessToken)
			.then((user) => {
				if (!user) {
					return ep.emit('get_err', '尚未登录')
				}
				res.json({
					success: true,
					data: user
				})
			})
			.catch(err => next(err))
	},
	/*  根据Account得到用户信息  */
	getUserInfoByAccount: async(req, res, next) => {
		let account = req.query.account

		let ep = new eventproxy()
		ep.fail(next)
		ep.on('get_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		await User.getUserByAccount(account)
			.then((user) => {
				console.log(user)
				if (!user) {
					return ep.emit('get_err', '未找到该用户')
				}
				res.json({
					success: true,
					data: user
				})
			})
			.catch(err => next(err))
	},
	/*  保存用户信息  */
	saveUserInfo: async(req, res, next) => {
		let accessToken = req.body.accessToken
		let info = req.body.info

		let ep = new eventproxy()
		ep.fail(next)
		ep.on('save_err', (msg, status = 403) => {
			res.status(status)
			res.json({
				success: false,
				message: msg
			})
		})

		if (!validator.isByteLength(info.name, { min: 2})) {
			return ep.emit('save_err', '昵称不能少于 2 个字符')
		}
		if (!validator.isByteLength(info.name, { max: 20 })) {
			return ep.emit('save_err', '昵称不能大于 20 个字符')
		}
		if (!validator.isByteLength(info.profile, { max: 99 })) {
			return ep.emit('save_err', '简介不能大于 99 个字符')
		}
		if (!validator.isByteLength(info.website, { max: 20 })) {
			return ep.emit('save_err', '个人网站不能大于 20 个字符')
		}
		if (!validator.isByteLength(info.location, { max: 20 })) {
			return ep.emit('save_err', '地点不能大于 20 个字符')
		}

		await User.getUserByAccessToken(accessToken)
			.then((user) => {
				if (!user) {
					return false
				}
				user.name = info.name
				user.profile = info.profile
				user.website = info.website
				user.location = info.location
				user.avatar = info.avatar
				return user.save()
			})
			.then((data) => {
				if (!data) {
					return ep.emit('save_err', '保存失败，请重新登录')
				}
				res.json({
					success: true,
					message: '保存成功'
				})
			})
			.catch(err => next(err))
	}
}
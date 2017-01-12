import { User } from '../proxy'
import express from 'express'

export default {
	login: async(req, res) => {
		res.render('login', {
			title: 'Login'
		})
	},
	/*  后台管理页面  */
	index: async(req, res) => {
		res.render('index', {
			title: 'miao!!!',
			data: [{name: 'nightcat!'}]
		})
	},
	/*  查看用户列表  */
	list: async(req, res, next) => {
		await User.getUsers()
			.then((data) => {
				return res.json({
					success: true,
					message: data
				})
			})
			.catch((err) => {
				next(err)
			})
	}
}
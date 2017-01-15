import { User } from '../proxy'
// import { formatDate } from '../common/utils'
// import express from 'express'

export default {
	/*  得到用户信息  */
	getUserInfo: async(req, res) => {
		let accessToken = req.query.accessToken
		await User.getUserByAccessToken(accessToken)
			.then((data) => {
				res.json({
					success: true,
					data: data
				})
			})
			.catch((err) => {
				next(err)
			})
	}
}
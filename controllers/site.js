import express from 'express'

export default {
	/*  跳转 至前端页面  */
	index: async(req, res) => {
		let app = req.app
		res.sendFile('/', { root: app.get('frone_views') })
	}
}
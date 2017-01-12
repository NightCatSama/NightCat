import express from 'express'

export default {
	index: async(req, res) => {
		let app = req.app
		res.sendFile('/', { root: app.get('frone_views') })
	}
}
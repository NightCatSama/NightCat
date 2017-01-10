import express from 'express'

export default {
	index: async(req, res) => {
		let app = req.app
		app.use(express.static(app.get('views')))
		res.sendfile('/', { root: app.get('views') })
	}
}
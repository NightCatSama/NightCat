import ctr from '../controllers'
import express from 'express'
const user = ctr.user

const allowCrossDomain = async function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200)
	} else {
		next()
	}
}

export default (app) => {
	app
		.use(async(req, res, next) => {
		next()
	})

	app
		.get('/user', async(req, res, next) => {
			res.send('miaohaha')
		})
		.get('/', async(req, res, next) => {
			next()
		}, async(req, res) => {
			app.use(express.static(app.get('views')))
			res.sendfile('views/dist/')
		})
		.use(allowCrossDomain)
		.post('/miao', user.miao)
		.post('/signup', user.signup)
}
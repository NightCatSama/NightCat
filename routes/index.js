import ctr from '../controllers'
const user = ctr.user
const site = ctr.site

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
		.get('/', site.index)
		.use(allowCrossDomain)
		.post('/signup', user.signup)  //  注册
}
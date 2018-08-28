/*  处理开发环境下跨域问题  */
function allowCrossDomain(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
	// res.header('Access-Control-Allow-Origin', `http://localhost:${config.dev_port}`)
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

	if ('OPTIONS' == req.method) {
		res.sendStatus(200)
	} else {
		next()
	}
}
export {
	allowCrossDomain
}
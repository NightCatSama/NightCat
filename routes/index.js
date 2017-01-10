import { allowCrossDomain } from '../middlewares/allowCrossDomain'
import ctr from '../controllers'
const user = ctr.user
const site = ctr.site


export default (app) => {
	app
		.use(async(req, res, next) => {
			next()
		})

	app
		.get('/', site.index)
		.use(allowCrossDomain)  // 设置响应头，防跨域
		.get('/test', user.test)  //  接口测试
		.get('/activeAccount', user.activeAccount) // 账号激活
		.post('/signin', user.signin)  //  登录
		.post('/signup', user.signup)  //  注册
		.post('/verify', user.verify)  //  验证登录信息是否有效
}
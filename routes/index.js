// import { userIsLogin } from '../middlewares/auth'
import { allowCrossDomain } from '../middlewares/response'
import ctr from '../controllers'
import express from 'express'
let router = express.Router();
const user = ctr.user
const site = ctr.site

router
	.get('/', site.index) // 跳转页面
	.get('/:name', site.index) // 跳转页面
	.use(allowCrossDomain)
	.get('/activeAccount', user.activeAccount) // 账号激活
	.post('/signin', user.signin)  //  登录
	.post('/signout', user.signout)  //  退出登录
	.post('/signup', user.signup)  //  注册
	.post('/verify', user.verify)  //  验证登录信息是否有效

export default router
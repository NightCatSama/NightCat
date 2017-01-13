// import { userIsLogin } from '../middlewares/auth'
import { allowCrossDomain } from '../middlewares/response'
import { setStaticOnFront } from '../middlewares/request'
import ctr from '../controllers'
import express from 'express'
let router = express.Router();
const sign = ctr.sign
const site = ctr.site

router
	.use(allowCrossDomain)
	.get('/activeAccount', sign.activeAccount) // 账号激活
	.post('/signin', sign.signin)  //  登录
	.post('/signout', sign.signout)  //  退出登录
	.post('/signup', sign.signup)  //  注册
	.post('/verify', sign.verify)  //  验证登录信息是否有效
	.use(setStaticOnFront)  //  设置文件静态目录
	.get('/', site.index) // 跳转页面
	.get('/:name', site.index) // 跳转页面

export default router
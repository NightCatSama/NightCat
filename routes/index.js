import { signinRequire } from '../middlewares/auth'
import { allowCrossDomain } from '../middlewares/response'
import { setStaticOnFront } from '../middlewares/request'
import ctr from '../controllers'
import express from 'express'
import path from 'path'
let router = express.Router();
const sign = ctr.sign
const site = ctr.site
const user = ctr.user

router
	.use(allowCrossDomain)
	.get('/activeAccount', sign.activeAccount) // 账号激活
	.post('/signin', sign.signin)  //  登录
	.post('/signout', sign.signout)  //  退出登录
	.post('/signup', sign.signup)  //  注册
	.post('/verify', sign.verify)  //  验证登录信息是否有效

	.get('/getUserInfo', signinRequire, user.getUserInfo)  //  得到用户信息
	.get('/getUserInfoByAccount', user.getUserInfoByAccount)  //  浏览用户信息
	.post('/saveUserInfo', signinRequire, user.saveUserInfo)  //  保存用户信息

	.use(setStaticOnFront)  //  设置文件静态目录
	.get(['/', '/:name', '/user/:account', '/games/:type', '/single-games/:type', '/online-games/:type'], site.index) //  跳转页面

export default router
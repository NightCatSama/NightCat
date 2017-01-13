import { setStaticOnBack } from '../middlewares/request'
import { userAdminRequired } from '../middlewares/auth'
import ctr from '../controllers'
import express from 'express'
let router = express.Router();
const admin = ctr.admin

router
	.post('/list', admin.list) // 获取用户列表
	.use(setStaticOnBack) // 设置文件目录
	.get('/', admin.login)  // 后台登录页
	.get('/index', userAdminRequired, admin.index)  // 后台首页

export default router
import { getStaticFileOnAdmin } from '../middlewares/request'
import { userAdminRequired } from '../middlewares/auth'
import ctr from '../controllers'
import express from 'express'

let router = express.Router()
const admin = ctr.admin

router
	.post('/list', admin.list) // 获取用户列表

export default router
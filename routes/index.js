import { signinRequire } from '../middlewares/auth'
import { allowCrossDomain } from '../middlewares/response'
import { setStaticOnFront } from '../middlewares/request'
import ctr from '../controllers'
import express from 'express'
import path from 'path'
let router = express.Router()
const sign = ctr.sign
const site = ctr.site
const user = ctr.user
const game = ctr.game

router
	.use(allowCrossDomain)
	.get('/github', sign.signinByGithub) // 账号激活
	.get('*', site.index) //  跳转页面

export default router
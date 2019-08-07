import { userAdminRequired } from '../middlewares/auth'
import express from 'express'

let router = express.Router()

router.use(userAdminRequired) // 权限管理

export default router

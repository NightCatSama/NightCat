import { getStaticFileOnAdmin } from '../middlewares/request'
import { userAdminRequired } from '../middlewares/auth'
import ctr from '../controllers'
import express from 'express'
import Nuxt from 'nuxt'
import config from '../nuxt.config.js'

let router = express.Router()
const admin = ctr.admin

const nuxt = new Nuxt(config)

router
	.post('/list', admin.list) // 获取用户列表
  .get('/admin/*', nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

export default router
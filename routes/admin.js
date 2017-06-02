import { getStaticFileOnAdmin } from '../middlewares/request'
import { userAdminRequired } from '../middlewares/auth'
import ctr from '../controllers'
import express from 'express'

let router = express.Router()

router
  .use(userAdminRequired)

export default router
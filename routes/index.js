import ctr from '../controllers'
import express from 'express'
import multiparty from 'multiparty'
import qingstor from '../common/qingstor'
import path from 'path'

let router = express.Router()
const { signinByGithub } = ctr.github
const { sendSignupEmail, activeEmail } = ctr.email
const { site } = ctr.site
router
    .post('/uploadImg', (req, res, next) => {
        const form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(files)
            let file = files.image[0].originalFilename
            qingstor.uploadObject(files.image[0].path, `tmp/${Date.now()}.jpg`)
                .then(result => {
                    return res.send(result.url)
                })
                .catch(err => {
                    console.log('errr')
                       // console.log(err)
                    }
                )
        });
    })

  .get('/github', signinByGithub) // 账号激活
  .post('/sendSignupEmail', sendSignupEmail) // 发送注册邮件
  .post('/activeEmail', activeEmail) // 通过 email 注册
  .get('*', site) //  跳转页面

export default router
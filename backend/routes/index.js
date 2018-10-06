import ctr from '../controllers'
import express from 'express'
import multiparty from 'multiparty'
import qingstor from 'qingstor'
import config from '../../config'

let router = express.Router()
const { signinByGithub } = ctr.github
const { sendSignupEmail, activeEmail } = ctr.email
const { site } = ctr.site

const reFileName = (file) => {
  let image =  file.substring(file.lastIndexOf('.') + 1)
  let currentYear = (new Date()).getFullYear()
  let currentMonth = (new Date()).getMonth() + 1
  return `tmp/${currentYear}/${currentMonth}/${Date.now()}.${image}`
}

router
    .post('/uploadImg', (req, res, next) => {
        const q = new qingstor(config.qingstor);
        const form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(files)
            let file = files.image[0].originalFilename
            q.uploadObject(files.image[0].path, reFileName(file))
                .then(result => {
                    return res.send(result.url)
                })
                .catch(err => {
                    console.log('err')
                })
        });
    })

  .get('/github', signinByGithub) // 账号激活
  .post('/sendSignupEmail', sendSignupEmail) // 发送注册邮件
  .post('/activeEmail', activeEmail) // 通过 email 注册
  .get('*', site) //  跳转页面

export default router

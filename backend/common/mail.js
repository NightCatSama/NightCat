import mailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import config from '../../config'
import logger from './logger'
import opn from 'opn'

let transporter = mailer.createTransport(smtpTransport(config.mail_opts))

/*  发送邮件  */
export const sendMail = async(data, link) => {
  if (config.debug) {
    console.log('发送邮件！')
    // return false
  }

  let success = false
  await transporter.sendMail(data)
  .then((res) => {
    success = true
    logger.info('发送邮件成功', data.to)
  })
  .catch((err) => {
    logger.error('发送邮件失败', data.to);
  })

  return success
}

/*  发送激活通知邮件  */
export const sendActiveMail = async(to, link, account) => {
  let from = config.mail_opts.auth.user
  let subject = `${config.name}账号激活`
  let html = `
  <h1>您好，${account}</h1>
  <p>我们收到了您在${config.name}的注册信息，请点击下方的链接激活账号</p>
  <a href="${link}">激活链接</a>
  <p>如果您未在${config.name}申请过账号注册，说明有人在滥用你的邮箱，请删除此封邮件，给您造成困扰真是抱歉</p>
  `

  return await sendMail({
    from,
    to,
    subject,
    html
  }, link)
}

/*  发送消息通知邮件  */
export const sendEmailNotification = async(to, article_id, account, floor) => {
  if (config.debug) {
    // return false
  }

  let from = config.mail_opts.auth.user
  let subject = `${config.name}消息通知`
  let SITE_ROOT_URL = `${config.protocol}://${config.host}`
  let link = `${SITE_ROOT_URL}/article/${article_id}?floor=${floor}`
  let html = `
  <h1>您好，${account}</h1>
  <p>您在${config.name}的评论有了最新的消息回复，请点击下方的链接查看</p>
  <a href="${link}">消息链接</a>
  <p>如果您未在${config.name}发表过评论或回复，说明有人在滥用你的邮箱，请删除此封邮件，给您造成困扰真是抱歉</p>
  `

  return await sendMail({
    from,
    to,
    subject,
    html
  }, link)
}

export default {
  sendMail,
  sendActiveMail,
  sendEmailNotification
}

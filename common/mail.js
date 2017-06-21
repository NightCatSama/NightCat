import mailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import config from '../config'
import logger from './logger'
import opn from 'opn'

let transporter = mailer.createTransport(smtpTransport(config.mail_opts))

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
export const sendMail = async(data, link) => {
	let success = false
	await	transporter.sendMail(data)
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
	let subject = `${config.name} 账号激活`
	let html = `
	<article style="font-family: 'Montserrat', 'Segoe UI', 'Microsoft Yahei', Helvetica, Arial; border: 1px solid #f05b72;">
		<h1 style="width: 100%; padding: 10px 0; margin: 0; background-color: #f05b72; color: #fff; text-align: center;">
			你好, ${account}
		</h1>
		<p style="padding: 20px; font-size: 14px; color: #3498db; text-align: center;">
			请点击下方的链接，完成账号激活ヽ(≧Д≦)ノ <br />
			<small style="color: #d71345;">(如果您未听说过什么 nightcat.win 网站，那无视这份邮件，谢谢)</small>
		</p>
		<a href="${link}" style="display: block; padding: 0 20px 20px; color: #3da8f5; text-align: center;">
			激活链接
		</a>
	</article>
	`

	return await sendMail({
		from,
		to,
		subject,
		html
	}, link)
}

// 发送消息通知邮件
export const sendEmailNotification = async(to, article_id, account, floor) => {
	if (config.debug) {
		return false
	}

	let from = config.mail_opts.auth.user
	let subject = `${config.name} 有人回复你!`
  let SITE_ROOT_URL = `http://${config.host}`
  let link = `${SITE_ROOT_URL}/article/${article_id}?floor=${floor}`
	let html = `
	<article style="font-family: 'Montserrat', 'Segoe UI', 'Microsoft Yahei', Helvetica, Arial; border: 1px solid #f05b72;">
		<h1 style="width: 100%; padding: 10px 0; margin: 0; background-color: #f05b72; color: #fff; text-align: center;">
			你好, ${account}
		</h1>
		<p style="padding: 20px; font-size: 14px; color: #3498db; text-align: center;">
			你的评论有一条最新回复 (≧Д≦)ノ，请点击下方的链接查看<br />
			<small style="color: #d71345;">(如果您未听说过什么 nightcat.win 网站，那无视这份邮件，谢谢)</small>
		</p>
		<a href="${link}" style="display: block; padding: 0 20px 20px; color: #3da8f5; text-align: center;">
			${link}
		</a>
	</article>
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
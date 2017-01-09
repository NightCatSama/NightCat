import { user } from '../models'
import uuid from 'uuid'

 /*  根据用户名查找用户  */
const getUserByNames = async(name) => {
	return await user.findOne({
		name: name
	})
}

 /*  根据账号查找用户  */
const getUserByAccount = async(account) => {
	return await user.findOne({
		account: account
	})
}

 /*  根据邮箱查找用户  */
const getUserByEmail = async(email) => {
	return await user.findOne({
		email: email
	})
}

 /*  生成新用户  */
const newAndSave = async(data) => {
	let u = new user()
	u.name = data.account
	u.account = data.account
	u.password = data.password
	u.email = data.email
	u.active = data.active || false
	u.accessToken = uuid.v4()
	return await u.save()
}

export default {
	getUserByNames,
	getUserByAccount,
	getUserByEmail,
	newAndSave
}

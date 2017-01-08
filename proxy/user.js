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
	data.name = data.account
	data.active = data.active || false
	user.accessToken = uuid.v4();
	return await user.create(data)
}

export default {
	getUserByNames,
	getUserByAccount,
	getUserByEmail,
	newAndSave
}

import { user } from '../models'
import { getGravatar } from '../common/sign'
import uuid from 'uuid'

 /*  获取完整的用户列表  */
export const getUsers = async() => {
	return await user.find({})
}

 /*  根据用户名查找用户  */
export const getUserByNames = async(name) => {
	return await user.findOne({
		name: name
	})
}

 /*  根据账号查找用户  */
export const getUserByAccount = async(account) => {
	return await user.findOne({
		account: account
	})
}

 /*  根据邮箱查找用户  */
export const getUserByEmail = async(email) => {
	return await user.findOne({
		email: email
	})
}

 /*  根据access_token查找用户  */
export const getUserByAccessToken = async(access_token) => {
	return await user.findOne({
		access_token: access_token
	})
}

 /*  生成新用户  */
export const newAndSave = async(data) => {
	let u = new user()
	u.name = data.name || data.account
	u.account = data.account
	u.password = data.password
	u.resetPwd = !!data.resetPwd
	u.profile = data.profile
	u.location = data.location,
	u.email = data.email
	u.github = data.github
	u.avatar = data.avatar || getGravatar(data.email || '')
	u.active = !!data.active
	u.access_token = data.access_token
	return await u.save()
}

export default {
	getUsers,
	getUserByNames,
	getUserByAccount,
	getUserByEmail,
	getUserByAccessToken,
	newAndSave
}

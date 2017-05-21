import { User } from '../proxy'
import { formatDate } from '../common/utils'

export default {
	/*  跳转后台登陆页面  */
	login: async(req, res) => {
		res.render('login', {
			title: 'NightCat 登录页'
		})
	},
	/*  后台管理页面  */
	index: async(req, res) => {
		await User.getUsers()
			.then((data) => {
				res.render('index', {
					title: 'NightCat 后台管理系统',
					data: data
				})
			})
			.catch((err) => {
				next(err)
			})
	},
	/*  查看用户列表  */
	list: async(req, res, next) => {
		await User.getUsers()
			.then((data) => {
				return res.json({
					success: true,
					message: data
				})
			})
			.catch((err) => {
				next(err)
			})
	}
}
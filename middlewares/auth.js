// import { User } from '../proxy'
// import { verifyToken } from '../common/user'
// import config from '../config'


/*  未登录跳转到登录页  */
export const userRequired = (req, res, next) => {
	if (!req.session || !req.session.token) {
		return res.status(403)
			.redirect(`/Sign?message=Login&link=${req.path}`);
	}
	next()
}

// /*  是否已登录  */
// export const userIsLogin = async(req, res, next) => {
// 	let token = req.session.token
// 	await verifyToken(token)
// 	.then(account => User.getUserByAccount(account))
// 	.then(data => {
// 		return next()
// 	})
// 	.catch(err => {
// 		throw '认证失败'
// 	})
// }

export default {
	userRequired,
	// userIsLogin
}
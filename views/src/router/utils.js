/*  是否自动登陆  */
const autoLogin = (nextState, replaceState, callback) => {
	let status = window.sessionStorage.login_status
	status = status && JSON.parse(status)
	if (status && status.isLogin) {
		callback()
		return
	}

	let token = window.localStorage.token
	if (token) {
		axios.post('/verify', {})
		.then((res) => {
			let data = res.data
			window.localStorage.token = data.token
			window.sessionStorage.accessToken = data.accessToken
			window.sessionStorage.login_status = JSON.stringify({
				isLogin: true
			})
			window.sessionStorage.userInfo = JSON.stringify(data.userInfo)
			callback()
		})
		.catch((err) => {
			window.localStorage.removeItem('token')
			window.sessionStorage.removeItem('login_status')
			callback()
		})
	}
	else {
		callback()
	}
}

/*  需要登陆  */
const userRequired = (nextState, replaceState) => {
	let status = window.sessionStorage.login_status
	status = status && JSON.parse(status)
	if (!status || !status.isLogin) {
		replaceState(`/Sign?message=${encodeURIComponent('请先登录')}&link=${nextState.location.pathname}`)
		return
	}
}

export {
	autoLogin,
	userRequired
}
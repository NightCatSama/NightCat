import store from 'store'

/*  是否自动登陆  */
const autoLogin = (nextState, replaceState, callback) => {
	let { isLogin } = store.getState().auth
	if (isLogin) {
		callback()
		return
	}

	let token = window.localStorage.token

	if (token) {
		axios.post('/verify', {})
		.then((res) => {
			let data = res.data
			window.localStorage.token = data.token
			store.dispatch({ type: 'SET_STATUS', payload: data })
			callback()
		})
		.catch((err) => {
			window.localStorage.removeItem('token')
			callback()
		})
	}
	else {
		callback()
	}
}

/*  需要登陆  */
const userRequired = (nextState, replaceState) => {
	let { isLogin } = store.getState().auth
	if (!isLogin) {
		replaceState(`/Sign?message=${encodeURIComponent('请先登录')}&link=${nextState.location.pathname}`)
		return
	}
}

export {
	autoLogin,
	userRequired
}
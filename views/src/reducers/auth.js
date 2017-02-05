import { handleActions } from 'redux-actions'
import * as ActionTypes from 'constants/AuthType'

const initialState = {
	isLogin: false,
	accessToken: null,
	userInfo: null,
	events: {},
	signin_time: null
}

const headerBtn = handleActions({
	/*  保存登陆信息，记录登陆时间  */
	[ActionTypes.SET_STATUS](state, { payload }) {
		window.localStorage.token = payload.token
		return Object.assign({}, state, {
			isLogin: true,
			signin_time: new Date()
		}, payload)
	},
	/*  更新accessToken  */
	[ActionTypes.SET_ACCESSTOKEN](state, { payload }) {
		return Object.assign({}, state, {
			accessToken: payload
		})
	},
	/*  更新userInfo  */
	[ActionTypes.SET_USERINFO](state, { payload }) {
		return Object.assign({}, state, {
			userInfo: Object.assign(state.userInfo, payload)
		})
	},
	/*  订阅事件，当信息更新时刷新  */
	[ActionTypes.SUBSCRIBE_EVENTS](state, { payload }) {
		let newState = Object.assign({}, state)
		newState.events[payload.key] = payload.fn
		return newState
	},
	/*  取消订阅  */
	[ActionTypes.UNSUBSCRIBE_EVENTS](state, { payload }) {
		let newState = Object.assign({}, state)
		delete newState[payload]
		return newState
	},
	/*  刷新  */
	[ActionTypes.REFRESH](state, { payload }) {
		for (let key in state.events)
			state.events[key]()
        return state
	}
}, initialState)

export default headerBtn
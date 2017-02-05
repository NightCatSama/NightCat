import { createAction } from 'redux-actions'
import * as ActionTypes from 'constants/AuthType'

const HeaderBtnActions = {
	setStatus: createAction(ActionTypes.SET_STATUS),
	setAccessToken: createAction(ActionTypes.SET_ACCESSTOKEN),
	setUserInfo: createAction(ActionTypes.SET_USERINFO),
	subscribeEvents: createAction(ActionTypes.SUBSCRIBE_EVENTS, (key, fn) => {
		return {
			key,
			fn
		}
	}),
	unsubscribeEvents: createAction(ActionTypes.UNSUBSCRIBE_EVENTS),
	refresh: createAction(ActionTypes.REFRESH),
}

export default HeaderBtnActions
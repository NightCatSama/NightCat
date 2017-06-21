import { createAction } from 'redux-actions'
import * as ActionTypes from 'constants/AuthType'

const HeaderBtnActions = {
	setStatus: createAction(ActionTypes.SET_STATUS),
	setAccessToken: createAction(ActionTypes.SET_ACCESSTOKEN),
	setUserInfo: createAction(ActionTypes.SET_USERINFO),
	clearStatus: createAction(ActionTypes.CLEAR_STATUS)
}

export default HeaderBtnActions
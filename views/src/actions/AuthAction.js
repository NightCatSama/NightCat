import { createAction } from 'redux-actions';
import * as ActionTypes from 'constants/AuthType';

const HeaderBtnActions = {
	setAccessToken: createAction(ActionTypes.SET_ACCESSTOKEN)
};

export default HeaderBtnActions;
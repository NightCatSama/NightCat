import { createAction } from 'redux-actions';
import * as ActionTypes from 'constants/HeaderBtnType';

const HeaderBtnActions = {
	register: createAction(ActionTypes.RESGISTER_EVENT, (type, fn, data) => {
		return {
			type,
			fn,
			data
		}
	}),
	execute: createAction(ActionTypes.EXECUTE)
};

export default HeaderBtnActions;
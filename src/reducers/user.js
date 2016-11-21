import * as types from '../constants/ActionTypes';

const initialState = {
	name: "microsoft",
};

export default function user(state = initialState, action) {
	switch (action.type) {
      case types.CHANGE_USER_NAME:
        return Object.assign({}, state, {
        	name: action.name,
        });

      default:
        return state;
	}
}
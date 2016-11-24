import * as types from '../constants/ActionTypes';

const initialState = {
	path: "",
};

export default function router(state = initialState, action) {
	switch (action.type) {
      case types.CHANGE_PATH:
        return Object.assign({}, state, {
        	path: action.path,
        });

      default:
        return state;
	}
}
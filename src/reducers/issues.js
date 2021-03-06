import * as types from '../constants/ActionTypes';

const initialState = {
  list: [],
};

export default function repositories(state = initialState, action) {
	switch (action.type) {
      case types.RECEIVE_ISSUES:
        return Object.assign({}, state, { list: action.issues });

      default:
        return state;
	}
}
import * as types from '../constants/ActionTypes';

const initialState = {
  repos: [],
};

export default function repositories(state = initialState, action) {
	switch (action.type) {
      case types.RECEIVE_USER_REPOS:
        return Object.assign({}, state, {
          repos: action.repos,
        });

      default:
        return state;
	}
}
import * as types from '../constants/ActionTypes';

const initialState = {
  repos: [],
  activePage: 1,
};

export default function repositories(state = initialState, action) {
	switch (action.type) {
      case types.RECEIVE_USER_REPOS:
        const repos = action.addFlag ? state.repos.concat(action.repos) : action.repos;
        return Object.assign({}, state, { repos });
        
      case types.SET_ACTIVE_PAGE:
        return Object.assign({}, state, {activePage: action.activePage});

      default:
        return state;
	}
}
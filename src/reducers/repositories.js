import * as types from '../constants/ActionTypes';

const initialState = {
  repos: [],
  activePage: 1,
  sortBy: "name",
};

export default function repositories(state = initialState, action) {
	switch (action.type) {
      case types.RECEIVE_USER_REPOS:
        const repos = action.addFlag ? state.repos.concat(action.repos) : action.repos;
        return Object.assign({}, state, { repos });

      case types.CHANGE_ACTIVE_PAGE:
        return Object.assign({}, state, {activePage: action.activePage});

      case types.CHANGE_REPOS_SORT_BY:
        return Object.assign({}, state, {sortBy: action.sortBy});        

      default:
        return state;
	}
}
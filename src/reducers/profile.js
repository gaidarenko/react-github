import * as types from '../constants/ActionTypes';

const initialState = {
  name: "",
  location: "",
  avatar: "",
  repos: 0,
  followers: 0,
  following: 0,
};

export default function profile(state = initialState, action) {
	switch (action.type) {
      case types.RECEIVE_USER_PROFILE:
        return Object.assign({}, state, action.profile);

      default:
        return state;
	}
}
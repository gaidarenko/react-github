import { combineReducers } from 'redux';

import user from '../reducers/user';
import profile from '../reducers/profile';
import repositories from '../reducers/repositories';

const rootReducer = combineReducers({
	user,
	profile,
	repositories,
});

export default rootReducer;
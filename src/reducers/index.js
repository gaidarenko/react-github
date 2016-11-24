import { combineReducers } from 'redux';

import user from '../reducers/user';
import router from '../reducers/router';
import profile from '../reducers/profile';
import repositories from '../reducers/repositories';
import issues from '../reducers/issues';

const rootReducer = combineReducers({
	user,
	profile,
	repositories,
	router,
	issues,
});

export default rootReducer;
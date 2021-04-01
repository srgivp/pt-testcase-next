import { combineReducers } from 'redux';
import { authReducer, AuthInitialState } from './auth-reducer';
import { UsersInitialState, usersReducer } from './users-reducer';
import errorReducer, { AllErrorsHandler } from './error-reducer';
import { detailsReducer, DetailsState } from './details-reducer';

export type State = {
  auth: AuthInitialState;
  users: UsersInitialState;
  allErrorsHandler: AllErrorsHandler;
  user: DetailsState;
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  allErrorsHandler: errorReducer,
  user: detailsReducer,
});

export default rootReducer;

import {combineReducers} from 'redux';
import {authReducer, AuthInitialState} from "./auth-reducer";
import {UsersInitialState, usersReducer} from "./users-reducer";
import errorReducer, {AllErrorsHandler} from "./error-reducer";

export type State = {
    auth: AuthInitialState,
    users: UsersInitialState,
    allErrorsHandler: AllErrorsHandler
}

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    allErrorsHandler: errorReducer
})

export default rootReducer;


import {CLEAN_ERROR} from "../actions/action-types";
import {HYDRATE} from "next-redux-wrapper";

const errorReducer = (state = {error: null as null | Error}, action: any) => {
    if (action.payload && action.payload.error) {
        return {
            error: action.payload.error
        }
    } else if (action.type === HYDRATE) {
        if (action.payload.allErrorsHandler.error) {
            return {error: action.payload.allErrorsHandler.error};
        } else {
            return state;
        }
    } else if (action.type === CLEAN_ERROR) {
        return {error: null}
    } else {
        return state;
    }
}

export type AllErrorsHandler = ReturnType<typeof errorReducer>;

export default errorReducer;
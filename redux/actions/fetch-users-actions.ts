import {
    CLEAR_USERS_INFO,
    DELETE_USER,
    FETCH_USERS_ERROR,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS
} from "./action-types";
import {signOutAction} from "./auth-actions";
import {fetchUsersFromApi} from "../../support/axios";
import {actionSamplePayload} from "./action-samples";

export const fetchUsersSuccess = actionSamplePayload(FETCH_USERS_SUCCESS);
export const fetchUsersError = actionSamplePayload(FETCH_USERS_ERROR);

export const fetchUsersRequest = (pageNumber: number, token: string) => async (dispatch) => {
    dispatch({type: FETCH_USERS_REQUEST});
    let payload;
    try {
        payload = await fetchUsersFromApi(pageNumber, token);
        const {usersPortion, total} = payload;
        dispatch(fetchUsersSuccess({usersPortion, total, pageNumber}))
    } catch (error) {
        dispatch(fetchUsersError({error}))
    }
}

export const clearUsersInfo = (pageNumber: number, quantity: number) => {
    return {
        type: CLEAR_USERS_INFO,
        payload: {
            pageNumber,
            quantity
        }
    }
}

export const deleteUserAction = (id) => {
    return {
        type: DELETE_USER,
        payload: {id}
    }
}

export type FetchUsersActions = ReturnType<typeof fetchUsersError | typeof fetchUsersRequest | typeof fetchUsersSuccess | typeof signOutAction | typeof clearUsersInfo | typeof deleteUserAction>;
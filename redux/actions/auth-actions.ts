import {AUTH_ERROR, AUTH_SUCCESS, SIGN_IN_REQUEST, SIGN_OUT, SIGN_UP_REQUEST} from "./action-types";
import {actionSamplePayload, actionAsyncSamplePayload, actionSampleWoPayload} from "./action-samples";
import {signInToApi, signUpToApi} from "../../support/axios";

export const authSuccess = actionAsyncSamplePayload(AUTH_SUCCESS);
export const authError = actionSamplePayload(AUTH_ERROR);

export const authRequest = (type, fetcher, payload) => async (dispatch) => {
    dispatch({type: type});
    const {login, password} = payload;
    try {
        let token = await fetcher(login, password)
            .then(res => {const {token} = res.data; return token;})
        document.cookie = `token=${token}`;
        dispatch({type: AUTH_SUCCESS, payload: {token}})
    } catch (error) {
        dispatch(authError({error}))
    }
}

export const signInRequest = (payload) => {
    return authRequest(SIGN_IN_REQUEST, signInToApi, payload);
}

export const signUpRequest = (payload) => {
    return authRequest(SIGN_UP_REQUEST, signUpToApi, payload);
}

export const signOutAction = () => {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    return {
        type: SIGN_OUT
    }
};

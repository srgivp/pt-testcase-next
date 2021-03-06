import { AUTH_ERROR, AUTH_SUCCESS, SIGN_IN_REQUEST, SIGN_OUT, SIGN_UP_REQUEST } from './action-types';
import { actionSamplePayload, actionAsyncSamplePayload } from './action-samples';
import { signInToApi, signUpToApi } from '../../support/axios';
import Cookies from 'js-cookie';

export const authSuccess = actionAsyncSamplePayload(AUTH_SUCCESS);
export const authError = actionSamplePayload(AUTH_ERROR);

export const authRequest = (type, fetcher, payload) => async dispatch => {
  dispatch({ type: type });
  const { login, password, apiKey } = payload;
  try {
    const token = await fetcher(login, password).then(res => {
      const { token } = res.data;
      return token;
    });
    const apiKeyCorrect = apiKey && apiKey.length > 3 ? apiKey : process.env.NEXT_PUBLIC_APP_ID
    Cookies.set('apiKey', `${apiKeyCorrect}`);
    const existingToken = Cookies.get('token');
    if (!existingToken) {
      Cookies.set('token', `${token}`);
    }
    dispatch({ type: AUTH_SUCCESS, payload: { token, apiKey } });
  } catch (error) {
    dispatch(authError({ error }));
  }
};

export const signInRequest = payload => {
  return authRequest(SIGN_IN_REQUEST, signInToApi, payload);
};

export const signUpRequest = payload => {
  return authRequest(SIGN_UP_REQUEST, signUpToApi, payload);
};

export const signOutAction = () => {
  Cookies.remove('token');
  Cookies.remove('apiKey');
  return {
    type: SIGN_OUT,
  };
};

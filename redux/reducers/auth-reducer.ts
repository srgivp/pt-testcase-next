import { AUTH_ERROR, SIGN_IN_REQUEST, AUTH_SUCCESS, SIGN_OUT, SIGN_UP_REQUEST } from '../actions/action-types';
import { HYDRATE } from 'next-redux-wrapper';

export const AUTH_INITIAL_STATE = {
  loading: false,
  isLoggedIn: false,
  isAuthReady: false,
  token: null as null | string,
  apiKey: null as null | string,
  error: null as null | Error,
};

export type AuthInitialState = typeof AUTH_INITIAL_STATE;

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case AUTH_SUCCESS: {
      const { token, apiKey } = action.payload;
      return {
        ...state,
        loading: false,
        token,
        apiKey,
        error: null,
        isAuthReady: true,
        isLoggedIn: !!token,
      };
    }
    case AUTH_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
        isAuthReady: true,
      };
    }
    case SIGN_OUT: {
      return {
        loading: false,
        isLoggedIn: false,
        isAuthReady: false,
        token: null,
        apiKey: null,
        error: null,
      };
    }
    case HYDRATE: {
      const stateHydration = JSON.parse(JSON.stringify(state));
      if (!stateHydration.token && action.payload.auth.token) {
        stateHydration.token = action.payload.auth.token;
      }
      if (action.payload.auth.apiKey) {
        stateHydration.apiKey = action.payload.auth.apiKey;
      }
      return stateHydration;
    }
    default: {
      return state;
    }
  }
};

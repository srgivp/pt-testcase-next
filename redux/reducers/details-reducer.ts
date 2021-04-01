import {
  FETCH_DETAILS_ERROR,
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  CLEAN_DETAILS_INFO,
  DISPLAY_EXISTING_USER,
  EDIT_USER,
  SIGN_OUT,
} from '../actions/action-types';
import { UserState } from '../../support/axios';
import { HYDRATE } from 'next-redux-wrapper';

export const userInitialState = {
  loading: false,
  info: null as null | UserState,
  error: null as null | Error,
};

export type DetailsState = typeof userInitialState;

export const detailsReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case FETCH_DETAILS_REQUEST: {
      return {
        loading: true,
        info: null,
        error: null,
      };
    }
    case FETCH_DETAILS_SUCCESS: {
      return {
        loading: false,
        info: action.payload.details,
        error: null,
      };
    }
    case FETCH_DETAILS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case CLEAN_DETAILS_INFO: {
      return userInitialState;
    }
    case DISPLAY_EXISTING_USER: {
      return {
        loading: false,
        info: action.payload.details,
        error: null,
      };
    }
    case HYDRATE: {
      const stateHydrated = action.payload.user;
      if (stateHydrated.error) {
        return {
          ...state,
          loading: false,
          error: stateHydrated.error,
        };
      } else if ((state.info?.id || stateHydrated.info?.id) && stateHydrated.info.id !== state.info?.id) {
        return {
          loading: false,
          error: null,
          info: stateHydrated.info,
        };
      } else {
        return state;
      }
    }
    case EDIT_USER: {
      const stateBeforeEditing = JSON.parse(JSON.stringify(state));
      return { ...stateBeforeEditing.info, ...action.payload.details };
    }
    case SIGN_OUT: {
      return userInitialState;
    }
    default: {
      return state;
    }
  }
};

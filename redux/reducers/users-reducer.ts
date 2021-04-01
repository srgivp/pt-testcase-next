import {
  EDIT_USER,
  FETCH_DETAILS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SIGN_OUT,
  DELETE_USER,
} from '../actions/action-types';
import { UsersItem } from '../../components/types-components';
import { HYDRATE } from 'next-redux-wrapper';

const INITIAL_STATE = {
  loading: false,
  error: null as null | Error,
  info: [] as [] | UsersItem[],
  quantity: null as null | number,
  pageNumber: null as null | number,
};

export type UsersInitialState = typeof INITIAL_STATE;

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_USERS_SUCCESS: {
      return {
        loading: false,
        error: null,
        info: action.payload.usersPortion,
        quantity: state.quantity ? state.quantity : action.payload.total,
        pageNumber: action.payload.pageNumber,
      };
    }
    case FETCH_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case SIGN_OUT: {
      return {
        loading: false,
        error: null,
        info: [],
        quantity: null,
        pageNumber: null,
      };
    }
    case FETCH_DETAILS_SUCCESS: {
      const stateBeforeDetails = JSON.parse(JSON.stringify(state));
      const { details } = action.payload;
      const id = details.id;
      for (let i = 0; i < stateBeforeDetails.info.length; i++) {
        if (stateBeforeDetails.info[i].id === id) {
          stateBeforeDetails.info[i].details = details;
          break;
        }
      }
      return stateBeforeDetails;
    }
    case EDIT_USER: {
      const stateBeforeEditing = JSON.parse(JSON.stringify(state));
      const { details } = action.payload;
      const id = details.id;
      for (let i = 0; i < stateBeforeEditing.info.length; i++) {
        if (stateBeforeEditing.info[i].id === id) {
          stateBeforeEditing.info[i] = { ...stateBeforeEditing.info[i], ...action.payload.details };
          stateBeforeEditing.info[i].details = { ...stateBeforeEditing.info[i].details, ...action.payload.details };
          break;
        }
      }
      return stateBeforeEditing;
    }
    case DELETE_USER: {
      const stateBeforeDelete = JSON.parse(JSON.stringify(state));
      stateBeforeDelete.info = stateBeforeDelete.info.filter(item => item.id !== action.payload.id);
      return stateBeforeDelete;
    }
    case HYDRATE: {
      if (action.payload.user.info?.id) {
        const stateBeforeDetails = JSON.parse(JSON.stringify(state));
        const id = action.payload.user.info?.id;
        for (let i = 0; i < stateBeforeDetails.info.length; i++) {
          if (stateBeforeDetails.info[i].id === id && !stateBeforeDetails.info[i].details) {
            stateBeforeDetails.info[i].details = action.payload.user.info;
            break;
          }
        }
        return stateBeforeDetails;
      }
      const stateHydrated = action.payload.users;
      if (!stateHydrated) {
        return state;
      } else if (stateHydrated.error) {
        return {
          ...state,
          loading: false,
          error: stateHydrated.error,
        };
      } else if (
        (state.info.length < 1 || state.pageNumber !== stateHydrated.pageNumber) &&
        stateHydrated.info.length > 0
      ) {
        return {
          loading: false,
          error: null,
          info: stateHydrated.info,
          quantity: stateHydrated.quantity,
          pageNumber: stateHydrated.pageNumber,
        };
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};

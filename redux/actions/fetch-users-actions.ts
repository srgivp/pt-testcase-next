import {
  CLEAR_USERS_INFO,
  DELETE_USER,
  EDIT_USER,
  FETCH_USERS_ERROR,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from './action-types';
import { signOutAction } from './auth-actions';
import { fetchUsersFromApi } from '../../support/axios';
import { actionSamplePayload } from './action-samples';

export const fetchUsersSuccess = actionSamplePayload(FETCH_USERS_SUCCESS);
export const fetchUsersError = actionSamplePayload(FETCH_USERS_ERROR);

export const fetchUsersRequest = (pageNumber: number, token: string) => async dispatch => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const payload = await fetchUsersFromApi(pageNumber, token);
    const { usersPortion, total } = payload;
    dispatch(fetchUsersSuccess({ usersPortion, total, pageNumber }));
  } catch (error) {
    const errorJson = { message: error.toJSON().message };
    dispatch(fetchUsersError({ error: errorJson }));
  }
};

export const clearUsersInfo = (pageNumber: number, quantity: number) => {
  return {
    type: CLEAR_USERS_INFO,
    payload: {
      pageNumber,
      quantity,
    },
  };
};

export const deleteUserAction = actionSamplePayload(DELETE_USER);

export const editUserAction = details => {
  let age = Date.now() - details.dateOfBirth.getTime();
  age = age / 31556952000; //ms in year
  age = Math.floor(age);
  details.age = age;
  return {
    type: EDIT_USER,
    payload: {
      details,
    },
  };
};

export type FetchUsersActions = ReturnType<
  | typeof fetchUsersError
  | typeof fetchUsersRequest
  | typeof fetchUsersSuccess
  | typeof signOutAction
  | typeof clearUsersInfo
  | typeof deleteUserAction
>;

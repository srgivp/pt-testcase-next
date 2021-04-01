import {
  CLEAR_USERS_INFO,
  DELETE_USER,
  EDIT_USER,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
} from './action-types';
import { signOutAction } from './auth-actions';
import { actionSamplePayload } from './action-samples';

export const fetchUsersSuccess = actionSamplePayload(FETCH_USERS_SUCCESS);
export const fetchUsersError = actionSamplePayload(FETCH_USERS_ERROR);

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
  | typeof fetchUsersSuccess
  | typeof signOutAction
  | typeof clearUsersInfo
  | typeof deleteUserAction
>;

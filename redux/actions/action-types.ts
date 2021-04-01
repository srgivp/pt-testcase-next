export const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST' as const;
export const SIGN_UP_REQUEST = '@auth/SIGN_UP_REQUEST' as const;
export const AUTH_SUCCESS = '@auth/AUTH_SUCCESS' as const;
export const AUTH_ERROR = '@auth/AUTH_ERROR' as const;
export const SIGN_OUT = '@auth/SIGN_OUT' as const;
export const EDIT_USER = '@details/EDIT_USER' as const;
export const FETCH_USERS_REQUEST = '@users/FETCH_USERS_REQUEST' as const;
export const FETCH_USERS_SUCCESS = '@users/FETCH_USERS_SUCCESS' as const;
export const FETCH_USERS_ERROR = '@users/FETCH_USERS_ERROR' as const;
export const CLEAR_USERS_INFO = '@users/CLEAR_USERS_INFO' as const;
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const DELETE_USER = '@users/DELETE_USER' as const;
export const FETCH_DETAILS_REQUEST = '@details/FETCH_DETAILS_REQUEST' as const;
export const FETCH_DETAILS_SUCCESS = '@details/FETCH_DETAILS_SUCCESS' as const;
export const FETCH_DETAILS_ERROR = '@details/FETCH_DETAILS_ERROR' as const;
export const CLEAN_DETAILS_INFO = '@details/CLEAN_DETAILS_INFO' as const;
export const DISPLAY_EXISTING_USER = '@details/DISPLAY_EXISTING_USER' as const;

export type Action<P> = {
  type: string;
  payload?: P;
};

import { DISPLAY_EXISTING_USER } from './action-types';
import { UserState } from '../../support/axios';

export const displayExistingUserAction = (details: UserState) => {
  return {
    type: DISPLAY_EXISTING_USER,
    payload: { details },
  };
};

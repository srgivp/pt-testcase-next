import {
    FETCH_DETAILS_ERROR,
    FETCH_DETAILS_REQUEST,
    FETCH_DETAILS_SUCCESS,
    CLEAN_DETAILS_INFO
} from './action-types';
import { fetchDetailsFromApi, UserState } from '../../support/axios';
import {displayExistingUserAction} from './dispaly-existing-user-action';
import { actionSamplePayload } from './action-samples';

export const fetchDetailsRequest = (id: string, token: string) => async (dispatch) => {
    dispatch({type: FETCH_DETAILS_REQUEST});
    try {
        const response = await fetchDetailsFromApi(id, token);
        dispatch(fetchDetailsSuccess(response));
    } catch (error) {
        dispatch(fetchDetailsError(error))
    }
}

export const fetchDetailsSuccess = (details: UserState) => {
    const parseISOString = (s) => {
        const b = (s.split(/\D+/));
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    };
    const dateOfBirth = parseISOString(details.dateOfBirth);

    let age = Date.now() - dateOfBirth.getTime();
    age = age / 31556952000; //ms in year
    age = Math.floor(age);
    details.age = age;
    return {
        type: FETCH_DETAILS_SUCCESS,
        payload: {
            details
        }
    }

}


export const fetchDetailsError = actionSamplePayload(FETCH_DETAILS_ERROR);

export const cleanDetailsInfo = () => {
    return {
        type: CLEAN_DETAILS_INFO
    }
}

export type FetchDetailsActions = ReturnType<typeof fetchDetailsError | typeof fetchDetailsRequest | typeof fetchDetailsSuccess | typeof cleanDetailsInfo | typeof displayExistingUserAction>
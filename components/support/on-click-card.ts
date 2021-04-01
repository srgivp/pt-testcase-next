import { deleteUserAction } from '../../redux/actions/fetch-users-actions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../redux/reducers/root-reducer';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { displayExistingUserAction } from '../../redux/actions/dispaly-existing-user-action';

export const useUserCard = () => {
  const router = useRouter();
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const onClickCardEdit = useCallback((id: string) => {
    if (state.users.info.length > 0) {
      for (let i = 0; i < state.users.info.length; i++) {
        if (state.users.info[i].id === id) {
          // dispatch({type: CLEAN_DETAILS_INFO});
          if (state.users.info[i].details) {
            dispatch(displayExistingUserAction(state.users.info[i].details));
          }
          break;
        }
      }
    }
    router.push('/users-page/[number]/user/[id]', `${router.asPath}/user/${id}`);
  }, []);
  const onClickCardDelete = useCallback((id: string) => {
    dispatch(deleteUserAction({ id }));
  }, []);
  return {
    state,
    dispatch,
    router,
    onClickCardEdit,
    onClickCardDelete,
  };
};

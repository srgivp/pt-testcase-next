import React from 'react';
import Button from '@material-ui/core/Button';
import { signOutAction } from '../redux/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ROUTES from '../routes/routes-constants';

const SignOutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Button
      id="sign-out"
      className="action-button"
      variant="contained"
      size="medium"
      onClick={() => {
        dispatch(signOutAction());
        router.push(ROUTES.signIn, ROUTES.signIn);
      }}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;

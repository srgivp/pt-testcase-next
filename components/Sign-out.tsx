import React from "react";
import Button from '@material-ui/core/Button';
import {signOutAction} from "../redux/actions/auth-actions";
import {useDispatch} from "react-redux";

const SignOutButton = () => {
    const dispatch = useDispatch();
    return <Button id='sign-out' className='action-button' variant='contained' size="medium" onClick={() => {dispatch(signOutAction())}}>
        Sign out
    </Button>
}

export default SignOutButton;
import {useSelector, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {useToasts, ToastProvider} from 'react-toast-notifications';
import {CLEAN_ERROR} from "../redux/actions/action-types";
import {signOutAction} from "../redux/actions/auth-actions";
import {State} from "../redux/reducers/root-reducer";

const ErrorHandler = () => {
    const stateError: Error = useSelector((state: State) => state.allErrorsHandler.error);
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const cleanError = () => {
        dispatch({type: CLEAN_ERROR});
        if (stateError.message === 'Request failed with status code 403') {
            dispatch(signOutAction());
        }
    };
    useEffect(() => {
        if (stateError) {
            addToast(stateError.message, {
                appearance: 'error',
                onDismiss: id => cleanError()
            })
        }

    }, [stateError])

    return (<div id='error-handler'> </div>)
}

export default () => {return <ToastProvider><ErrorHandler/></ToastProvider>};


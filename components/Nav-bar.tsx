import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import SignOutButton from "./Sign-out";
import {State} from "../redux/reducers/root-reducer";
import {useRouter} from "next/router";
import linksGenerator from "./support/links-generator";
import ROUTES from "../routes/routes-constants";
import ErrorHandler from "./Error-handler";

const NavBar = () => {
    const state: State = useSelector((state: State) => {
        return state;
    });
    const router = useRouter();
    useEffect(() => {
        if (!state.auth.token) {
                    router.push(ROUTES.signIn);
                }
    }, [state.auth.token])
    return <div id='nav-bar' className='flex-container space-between-container'>
        <ErrorHandler />
        <div id='pagination' className='flex-container component-container'>
            {state.users.quantity ? <><span>pages: </span>{linksGenerator(state.users.quantity)}</>  : null}
        </div>
        <div id='sign-out-container'>
            {state.auth.token && state.auth.token !== "''" ? <SignOutButton/> : null}
        </div>
    </div>

}

export default NavBar;
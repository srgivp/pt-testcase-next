import React from 'react';
import { useSelector } from 'react-redux';
import SignOutButton from './Sign-out';
import { State } from '../redux/reducers/root-reducer';
import linksGenerator from './support/links-generator';
import ErrorHandler from './Error-handler';

const NavBar = () => {
  const state: State = useSelector((state: State) => {
    return state;
  });
  return (
    <div id="nav-bar" className="flex-container space-between-container">
      <ErrorHandler />
      <div id="pagination" className="flex-container component-container">
        {state.users.quantity ? (
          <>
            <span>pages: </span>
            {linksGenerator(state.users.quantity)}
          </>
        ) : null}
      </div>
      <div id="sign-out-container">{state.auth.token && state.auth.token !== "''" ? <SignOutButton /> : null}</div>
    </div>
  );
};

export default NavBar;

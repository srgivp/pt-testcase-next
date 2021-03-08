import {createStore, compose, applyMiddleware, Store} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers/root-reducer";
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';





export const makeStore: MakeStore = (context: Context) => {
        return  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export const wrapper = createWrapper(makeStore, {debug: true});


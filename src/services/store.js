import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from './reducers/index'
import { socketMiddleware } from "./middleware/socketMiddleware";
import * as wsActionsTypes from './actions/wsActionTypes';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk),applyMiddleware(socketMiddleware(wsActionsTypes)));
export const store = createStore(rootReducer, enhancer);

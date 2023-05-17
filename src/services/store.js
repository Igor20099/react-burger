import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from './reducers/index'
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_URL } from "../utils/constants";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk,socketMiddleware(WS_URL)));
export const store = createStore(rootReducer, enhancer);

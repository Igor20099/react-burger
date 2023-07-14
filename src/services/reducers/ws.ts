// rootReducer.js

import { TWsOrders } from "../../types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  TWsActions,
} from "../actions/wsActionTypes";

type TWsState = {
  wsConnected: boolean;
  orders: TWsOrders | null;
  profileOrders: TWsOrders | null;
  error: Event | null;
};

const WsInitialState: TWsState = {
  wsConnected: false,
  orders: null,
  profileOrders: null,
  error: null,
};

export const wsReducer = (state = WsInitialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: null,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        error: null,
        orders: action.payload,
      };

    default:
      return state;
  }
};

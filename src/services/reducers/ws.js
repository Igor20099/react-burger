// rootReducer.js

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_GET_PROFILE_ORDERS,
  WS_SEND_ORDER,
} from "../actions/wsActionTypes.js";

const initialState = {
  wsConnected: false,
  orders: [],
  profileOrders:[],
  error: undefined,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
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
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

      case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        ordersProfile: action.payload,
      };

    
    default:
      return state;
  }
};

// rootReducer.js

import {
    WS_CONNECTION_PROFILE_SUCCESS,
    WS_CONNECTION_PROFILE_ERROR,
    WS_CONNECTION_PROFILE_CLOSED,
    WS_GET_PROFILE_ORDERS,
  } from "../actions/wsActionTypes.js";
  
  const initialState = {
    wsConnectedProfile: false,
    orders: [],
    error: undefined,
  };
  
  export const wsProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_PROFILE_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnectedProfile: true,
        };
  
      case WS_CONNECTION_PROFILE_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnectedProfile: false,
        };
  
      case WS_CONNECTION_PROFILE_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnectedProfile: false,
        };
  
      case WS_GET_PROFILE_ORDERS:
        return {
          ...state,
          error: undefined,
          orders: action.payload,
        };
  
      default:
        return state;
    }
  };
  
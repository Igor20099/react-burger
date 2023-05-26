import { Middleware, MiddlewareAPI } from "redux";

import { WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { tokenRequest } from "../actions/auth";

export const socketMiddleware = (wsActionTypes) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsActionTypes.WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: wsActionTypes.WS_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActionTypes.WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const newData = JSON.parse(data)
          dispatch({ type: wsActionTypes.WS_GET_ORDERS, payload: newData });
        };

        socket.onclose = (event) => {
          dispatch({
            type: wsActionTypes.WS_CONNECTION_CLOSED,
            payload: event,
          });
        };

        if (type === wsActionTypes.WS_SEND_MESSAGE) {
          const order = payload;
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
  };
};

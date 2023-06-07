import { Middleware, MiddlewareAPI } from "redux";

import { WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { tokenRequest } from "../actions/auth";
import { TWsActionNames, TWsActions } from "../actions/wsActionTypes";

export const socketMiddleware = (wsActionTypes:TWsActionNames) => {
  return (store:any) => {
    let socket:any = null;

    return (next:any) => (action:any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsActionTypes.WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event :WebSocketEventMap) => {
          dispatch({
            type: wsActionTypes.WS_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        socket.onerror = (event:WebSocketEventMap) => {
          dispatch({ type: wsActionTypes.WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event:WebSocketEventMap & {data:string}) => {
          const { data } = event;
          const newData = JSON.parse(data)
          dispatch({ type: wsActionTypes.WS_GET_ORDERS, payload: newData });
        };

        socket.onclose = (event:WebSocketEventMap) => {
          dispatch({
            type: wsActionTypes.WS_CONNECTION_CLOSED,
            payload: event,
          });
        };

        if (type === wsActionTypes.WS_SEND_ORDER) {
          const order = payload;
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
  };
};

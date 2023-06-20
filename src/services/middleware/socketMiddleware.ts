import { Middleware, MiddlewareAPI, AnyAction, Dispatch } from "redux";

import { WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { tokenRequest } from "../actions/auth";
import { TWsActionNames, TWsActions } from "../actions/wsActionTypes";
import { RootState } from "../../types";

export const socketMiddleware = (wsActionTypes: TWsActionNames) => {
  return (store: { dispatch: Dispatch<TWsActions> }) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: TWsActions) => {
      const { dispatch } = store;

      if (action.type === wsActionTypes.WS_CONNECTION_START) {
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

        socket.onmessage = (event: Event & { data: string })=> {
          const { data } = event;
          const newData = JSON.parse(data);
          dispatch({ type: wsActionTypes.WS_GET_ORDERS, payload: newData });
        };

        socket.onclose = (event) => {
          dispatch({
            type: wsActionTypes.WS_CONNECTION_CLOSED,
            payload: event,
          });
        };

        if (action.type === wsActionTypes.WS_SEND_ORDER) {
          const order = action.payload;
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
  };
};

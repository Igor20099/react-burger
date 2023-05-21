// socketMiddleware.js
import { Middleware, MiddlewareAPI } from "redux";

import { WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsActionTypes) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === "WS_CONNECTION_START") {
        socket = new WebSocket(`${WS_URL}/all`);
      }

      if (type === "WS_CONNECTION_PROFILE_START") {
        socket = new WebSocket(`${WS_URL}?token=${getCookie("token")}`);
      }

      if (socket && socket.url === `${WS_URL}?token=${getCookie("token")}`) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_PROFILE_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_PROFILE_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const newData = JSON.parse(data);
          dispatch({ type: "WS_GET_PROFILE_ORDERS", payload: newData });
        };
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_PROFILE_CLOSED", payload: event });
        };

        if (type === "WS_SEND_PROFILE_ORDER") {
          const order = payload;
          socket.send(JSON.stringify(order));
        }
      }

      if (socket && socket.url === `${WS_URL}/all`) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const newData = JSON.parse(data);
          dispatch({ type: "WS_GET_ORDERS", payload: newData });
        };
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        if (type === "WS_SEND_ORDER") {
          const order = payload;
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
  };
};

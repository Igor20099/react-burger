// socketMiddleware.js
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = wsActionTypes => {
    return store => {
        let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(action.payload);
      }
      if (socket) {

        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const newData = JSON.parse(data)
          dispatch({ type: 'WS_GET_ORDERS', payload: newData });
        };
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_ORDER') {
          const order = payload;
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
    };
};
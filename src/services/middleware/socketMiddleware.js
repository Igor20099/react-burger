// socketMiddleware.js
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = wsUrl => {
    return store => {
        let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === 'WS_CONNECTION_START') {
            // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const newData = JSON.parse(data)
          dispatch({ type: 'WS_GET_ORDERS', payload: newData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_ORDER') {
          const order = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(order));
        }
      }

      next(action);
    };
    };
};
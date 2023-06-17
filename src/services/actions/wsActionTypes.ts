import { TOrder } from "../../types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";
export const WS_SEND_ORDER: "WS_SEND_ORDER" = "WS_SEND_ORDER";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: any;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  payload: any;
}

export interface IWsSendOrderAction {
  readonly type: typeof WS_SEND_ORDER;
  payload:string;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetOrdersAction
  | IWsSendOrderAction;

export type TWsActionNames = {
  [key in TWsActions["type"]]: key;
};

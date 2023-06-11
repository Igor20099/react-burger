import { AppDispatch, TOrder } from "../../types";
import { orderRequest } from "../../utils/api";
import { getCookie } from "../../utils/cookie";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: "GET_ORDER_ERROR" = "GET_ORDER_ERROR";
export const GET_ORDER_NUMBER: "GET_ORDER_NUMBER" = "GET_ORDER_NUMBER";
export const CLOSE_ORDER: "CLOSE_ORDER" = "CLOSE_ORDER";

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload:TOrder
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface IGetOrderNumber {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface ICloseOrder {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderDetailsActions = | IGetOrderRequest | IGetOrderSuccess | IGetOrderError | IGetOrderNumber | ICloseOrder

export function getOrder(data: any) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderRequest(data, getCookie("token"))
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_ORDER_SUCCESS, payload: res });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

import { AppDispatch, AppThunk, TOrder } from "../../types";
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
  payload: TOrder;
  number: number;
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

export type TOrderDetailsActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError
  | IGetOrderNumber
  | ICloseOrder;

export const getOrder: AppThunk = (data: TOrder) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderRequest(data, getCookie("token"))
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res,
            number: res.order.number,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

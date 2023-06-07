import { AppDispatch } from "../../types";
import { orderRequest } from "../../utils/api";
import { getCookie } from "../../utils/cookie";

export const GET_ORDER_REQUEST:"GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS:"GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR:"GET_ORDER_ERROR" = "GET_ORDER_ERROR";
export const GET_ORDER_NUMBER:"GET_ORDER_NUMBER" = "GET_ORDER_NUMBER";
export const CLOSE_ORDER:"CLOSE_ORDER" = "CLOSE_ORDER";

export function getOrder(data:any) {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderRequest(data,getCookie('token'))
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

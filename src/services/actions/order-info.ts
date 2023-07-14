import { TOrder } from "../../types";

export const GET_ORDER: "GET_ORDER" = "GET_ORDER";
export const DELETE_ORDER: "DELETE_ORDER" = "DELETE_ORDER";

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER;
  readonly payload: TOrder;
}

export interface IDeleteOrderAction {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderInfoActions = IGetOrderAction | IDeleteOrderAction;

export const getOrder = (order: TOrder) => ({
  type: GET_ORDER,
  payload: order,
});

export const deleteOrder = () => ({
  type: DELETE_ORDER,
});

import { TOrder } from "../../types";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLOSE_ORDER,
  TOrderDetailsActions
} from "../actions/order-details";

type TOrderDetailsState = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: TOrder | null
}

const orderDetailsInitialState:TOrderDetailsState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
};

export const orderDetailsReducer = (state = orderDetailsInitialState, action:TOrderDetailsActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
    case CLOSE_ORDER: {
        return {
            ...orderDetailsInitialState
        }
    }
    default: {
      return state;
    }
  }
};

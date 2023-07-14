import { TOrder } from "../../types";
import { GET_ORDER, DELETE_ORDER, TOrderInfoActions } from "../actions/order-info";
  
type TOrderInfoState = {
  order: TOrder | null
}

const orderInfoeInitialState: TOrderInfoState = {
    order: null,
  };
  
  export const orderInfoReducer = (state = orderInfoeInitialState, action: TOrderInfoActions) => {
    switch (action.type) {
      case GET_ORDER: {
        return {
          ...state,
          order: action.payload,
        };
      }
      case DELETE_ORDER: {
          return {
              ...orderInfoeInitialState
          }
      }
      default:{
          return state
      }
    }
  };
  
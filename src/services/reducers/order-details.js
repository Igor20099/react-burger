import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLOSE_ORDER,
} from "../actions/order-details";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
};

export const orderDetailsReducer = (state = initialState, action) => {
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
            ...initialState
        }
    }
    default: {
      return state;
    }
  }
};

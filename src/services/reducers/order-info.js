import { GET_ORDER, DELETE_ORDER } from "../actions/order-info";
  
const initialState = {
    order: null,
  };
  
  export const orderInfoReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDER: {
        return {
          ...state,
          order: action.payload,
        };
      }
      case DELETE_ORDER: {
          return {
              ...initialState
          }
      }
      default:{
          return state
      }
    }
  };
  
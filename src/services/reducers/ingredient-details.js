import {
  GET_INGREDIENT,
  DELETE_INGREDIENT,
} from "../actions/ingredient-details";

const initialState = {
  ingredient: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
        return {
            ...initialState
        }
    }
    default:{
        return state
    }
  }
};

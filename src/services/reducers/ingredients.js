import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
} from "../actions/ingredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

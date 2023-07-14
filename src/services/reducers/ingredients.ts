import { TIngredient } from "../../types";
import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
  TIngredientsActions,
} from "../actions/ingredients";

type TIngredientsState = {
  ingredientsRequest:boolean
  ingredientsFailed: boolean
  ingredients: Array<TIngredient>
}

const ingredientsInitialState:TIngredientsState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

export const ingredientsReducer = (state = ingredientsInitialState, action:TIngredientsActions) => {
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

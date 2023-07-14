import { TIngredient } from "../../types";
import {
  GET_INGREDIENT,
  DELETE_INGREDIENT,
  TIngredientDetailsActions,
} from "../actions/ingredient-details";

type TIngredientDetailsState = {
  ingredient: TIngredient | null;
};

const ingredientDetailsInitialState: TIngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsReducer = (
  state = ingredientDetailsInitialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case GET_INGREDIENT: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...ingredientDetailsInitialState,
      };
    }
    default: {
      return state;
    }
  }
};

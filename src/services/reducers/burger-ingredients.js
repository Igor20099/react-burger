import { ADD_INGREDIENT } from "../actions/burger-ingredients";
import { DELETE_INGREDIENT } from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  bun: null,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type !== "bun") {
        const item = {...action.payload, uniqueId:action.uniqueId}
        return {
          ...state,
          ingredients: [...state.ingredients, item],
        };
      } else {
        return {
          ...state,
          bun: action.payload,
        };
      }
    }
    case DELETE_INGREDIENT: {
        return {
            ...state,
            ingredients:  [...state.ingredients].filter(el => el.uniqueId !== action.id)
        }
    }

    default:
      return state;
  }
};

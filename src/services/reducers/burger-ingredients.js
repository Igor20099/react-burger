import {
  ADD_INGREDIENT,
  COUNT_UP,
  COUNT_DOWN,
} from "../actions/burger-ingredients";
import { DELETE_INGREDIENT } from "../actions/burger-ingredients";
import { MOVE_INGREDIENT } from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  bun: null,
  counts: {},
  count: 0,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type !== "bun") {
        const item = { ...action.payload, uniqueId: action.uniqueId };
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
        ingredients: [...state.ingredients].filter(
          (el) => el.uniqueId !== action.id
        ),
      };
    }
    case MOVE_INGREDIENT: {
      const ingredietsConstructor = [...state.ingredients];
      ingredietsConstructor.splice(
        action.toIndex,
        0,
        ingredietsConstructor.splice(action.fromIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: ingredietsConstructor,
      };
    }
    case COUNT_UP: {
      if (action.ingredientType === "bun" && state.counts[action.id] >= 2) {
        return state;
      }
      if (state.bun && action.ingredientType === "bun") {
        return {
          ...state,
          counts: {
            ...state.counts,
            [state.bun._id]: (state.counts[state.bun._id] || 0) + 2,
          },
        };
      } else {
        return {
          ...state,
          counts: {
            ...state.counts,
            [action.id]: (state.counts[action.id] || 0) + 1,
          },
        };
      }
    }

    case COUNT_DOWN: {
      if (action.ingredientType !== "bun") {
        return {
          ...state,
          counts: {
            ...state.counts,
            [action.id]: state.counts[action.id] - 1,
          },
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

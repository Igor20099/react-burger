import { ADD_INGREDIENT, COUNT_UP } from "../actions/burger-ingredients";
import { DELETE_INGREDIENT } from "../actions/burger-ingredients";
import { MOVE_INGREDIENT } from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  bun: null,
  counts:{},
  count:0
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
    case MOVE_INGREDIENT: {
			const ingredietsConstructor = [...state.ingredients];
			ingredietsConstructor.splice(action.toIndex, 0,ingredietsConstructor.splice(action.fromIndex,1)[0]);
			return {
				...state,
				ingredients: ingredietsConstructor
			};
		}
    case COUNT_UP: {
      return {
        ...state,
        counts:{
          ...state.counts,
          [action.id]:  ( state.counts[action.id] || 0 ) + 1
        }
      }
    }

    default:
      return state;
  }
};

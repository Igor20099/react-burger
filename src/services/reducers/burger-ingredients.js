import { ADD_INGREDIENT } from "../actions/burger-ingredients"


const initialState = {
    ingredients:[]
}

export const burgerIngredientsReducer = (state= initialState, action) => {
 switch (action.type) {
    case ADD_INGREDIENT: {
        return {
            ...state,
            ingredients: [...state.ingredients,action.payload]
        }
    }

    default:
        return state
 }
}
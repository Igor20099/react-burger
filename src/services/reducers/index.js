import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { authorizationReducer } from "./auth";
import { wsReducer } from "./ws";


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth:authorizationReducer,
  ws:wsReducer,
});

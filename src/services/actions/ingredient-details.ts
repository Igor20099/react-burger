import { TIngredient } from "../../types";

export const GET_INGREDIENT:"GET_INGREDIENT" = "GET_INGREDIENT";
export const DELETE_INGREDIENT:"REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";

export const getIngredient = (ingredient:TIngredient) => ({
  type: GET_INGREDIENT,
  payload: ingredient,
});

export const deleteIngredient = () => ({
  type: DELETE_INGREDIENT,
});

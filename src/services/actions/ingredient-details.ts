import { TIngredient } from "../../types";

export const GET_INGREDIENT: "GET_INGREDIENT" = "GET_INGREDIENT";
export const DELETE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";

export interface IGetIngredient {
  readonly type: typeof GET_INGREDIENT;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
}

export type TIngredientDetailsActions = | IGetIngredient | IDeleteIngredient;

export const getIngredient = (ingredient: TIngredient) => ({
  type: GET_INGREDIENT,
  payload: ingredient,
});

export const deleteIngredient = () => ({
  type: DELETE_INGREDIENT,
});

import { TIngredient } from "../../types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const COUNT_UP: "COUNT_UP" = "COUNT_UP";
export const COUNT_DOWN: "COUNT_DOWN" = "COUNT_DOWN";

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload:TIngredient;
  uniqueId:string;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  id:string
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  fromIndex:number;
  toIndex:number;
}

export interface ICountUp {
  readonly type: typeof COUNT_UP;
  id:string;
  ingredientType:string
}

export interface ICountDown {
  readonly type: typeof COUNT_DOWN;
  id:string;
  ingredientType:string
}

export type TBurgerIngredientsActions =
  | IAddIngredient
  | IDeleteIngredient
  | IMoveIngredient
  | ICountUp
  | ICountDown;

export const addIngredient = (ingredient: TIngredient, uuid: string) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
  uniqueId: uuid,
});

export const deleteIngredient = (uniqueId: string) => ({
  type: DELETE_INGREDIENT,
  id: uniqueId,
});

export const moveIngredient = (fromIndex: number, toIndex: number) => ({
  type: MOVE_INGREDIENT,
  fromIndex: fromIndex,
  toIndex: toIndex,
});

export const countUp = (id: string, ingredientType: string) => ({
  type: COUNT_UP,
  id: id,
  ingredientType: ingredientType,
});

export const countDown = (id: string, ingredientType: string) => ({
  type: COUNT_DOWN,
  id: id,
  ingredientType: ingredientType,
});

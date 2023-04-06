export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addIngredient = (ingredient, uuid) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
  uniqueId: uuid,
});

export const deleteIngredient = (uniqueId) => ({
  type: DELETE_INGREDIENT,
  id: uniqueId,
});

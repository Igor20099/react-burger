export const GET_INGREDIENT = "GET_INGREDIENT";
export const DELETE_INGREDIENT = "REMOVE_INGREDIENT";

export const getIngredient = (ingredient) => ({
  type: GET_INGREDIENT,
  payload: ingredient,
});

export const deleteIngredient = () => ({
  type: DELETE_INGREDIENT,
});

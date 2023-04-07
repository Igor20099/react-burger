export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const COUNT_UP = 'COUNT_UP'
export const COUNT_DOWN = 'COUNT_DOWN'

export const addIngredient = (ingredient, uuid) => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
  uniqueId: uuid,
});

export const deleteIngredient = (uniqueId) => ({
  type: DELETE_INGREDIENT,
  id: uniqueId,
});

export const moveIngredient = (fromIndex,toIndex) =>({
  type:MOVE_INGREDIENT,
  fromIndex:fromIndex,
  toIndex:toIndex
})

export const countUp = (id) => (
  {
    type:COUNT_UP,
    id:id
  }
)

export const countDowm = (id) => (
  {
    type:COUNT_DOWN,
    id:id
  }
)

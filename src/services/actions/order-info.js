export const GET_ORDER = "GET_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export const getOrder = (order) => ({
  type: GET_ORDER,
  payload: order,
});

export const deleteOrder = () => ({
  type: DELETE_ORDER,
});

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const CLOSE_ORDER = "CLOSE_ORDER"

export function getOrder(data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: data.map((el) => {
          return el._id;
        }),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_ORDER_SUCCESS, payload: res });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
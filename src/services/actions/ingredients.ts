import { AppDispatch } from "../../types";
import { ingredientsRequest } from "../../utils/api";
export const INGREDIENTS_REQUEST:"INGREDIENTS_REQUEST" = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS:"INGREDIENTS_SUCCESS" = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR:"INGREDIENTS_ERROR" = "INGREDIENTS_ERROR";

export function getIngredients() {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: INGREDIENTS_REQUEST,
    });
    ingredientsRequest()
      .then((res) => {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

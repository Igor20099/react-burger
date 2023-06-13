import { AppDispatch, AppThunk, TIngredient } from "../../types";
import { ingredientsRequest } from "../../utils/api";
export const INGREDIENTS_REQUEST:"INGREDIENTS_REQUEST" = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS:"INGREDIENTS_SUCCESS" = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR:"INGREDIENTS_ERROR" = "INGREDIENTS_ERROR";

export interface IIngredientsRequest {
  readonly type: typeof INGREDIENTS_REQUEST
}

export interface IIngredientsSuccess {
  readonly type: typeof INGREDIENTS_SUCCESS
  ingredients:Array<TIngredient>
}

export interface IIngredientsError {
  readonly type: typeof INGREDIENTS_ERROR
}

export type TIngredientsActions = | IIngredientsRequest | IIngredientsSuccess | IIngredientsError


export const getIngredients:AppThunk = () =>  (dispatch:AppDispatch) => {
 
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
 
}


// export function getIngredients() {
//   return function (dispatch:AppDispatch) {
//     dispatch({
//       type: INGREDIENTS_REQUEST,
//     });
//     ingredientsRequest()
//       .then((res) => {
//         dispatch({
//           type: INGREDIENTS_SUCCESS,
//           ingredients: res.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }

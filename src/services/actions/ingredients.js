import {BASE_URL} from '../../utils/constants'
import { checkResponse } from '../../utils/utils'

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST'
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS'
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR'

export function getIngredients() {
    
  return function(dispatch) {

    dispatch({
      type: INGREDIENTS_REQUEST
    })
    fetch(`${BASE_URL}/ingredients`).then(checkResponse)
        .then(res => {
            dispatch({
                type: INGREDIENTS_SUCCESS,
                ingredients: res.data
            })
        }).catch((error) => {
          console.log(error);
        });
  }
}
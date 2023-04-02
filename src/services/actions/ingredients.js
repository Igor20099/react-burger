import {URL} from '../../utils/constants'

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST'
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS'
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR'

export function getIngredients() {
    
  return function(dispatch) {

    dispatch({
      type: INGREDIENTS_REQUEST
    })
    fetch(URL).then( res  => 
       {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res.status);
            }
        })
        .then(res => {
            dispatch({
                type: INGREDIENTS_SUCCESS,
                ingredients: res.data
            })
        })
  }
}
import { INGREDIENTS_REQUEST,INGREDIENTS_SUCCESS,INGREDIENTS_ERROR } from "../actions/ingredients"


const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients:[]
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case INGREDIENTS_REQUEST: {
        return {
          ...state,
                  // Запрос начал выполняться
                  ingredientsRequest: true,
                  // Сбрасываем статус наличия ошибок от предыдущего запроса 
                  // на случай, если он был и завершился с ошибкой
                  ingredientsFailed: false,
        };
      }
      case INGREDIENTS_SUCCESS: {
        return { 
                  ...state, 
                  // Запрос выполнился успешно, помещаем полученные данные в хранилище
                  ingredients: action.ingredients, 
                  // Запрос закончил своё выполнение
                  ingredientsRequest: false 
              };
      }
      case INGREDIENTS_ERROR: {
        return { 
                  ...state, 
                  // Запрос выполнился с ошибкой, 
                  // выставляем соответствующие значения в хранилище
                  ingredientsFailed: true, 
                  // Запрос закончил своё выполнение
                  ingredientsRequest: false 
              };
      }
          default: {
              return state
          }
      }
  } 
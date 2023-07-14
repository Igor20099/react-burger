 import { TIngredient,TOrder } from "../types";
 
 
 export function getPrice(elementIngredients: Array<String>, ingredients : Array<TIngredient>) {
    const elements = elementIngredients.map((id) =>
      ingredients.find((el) => el._id === id)
    );
    const totalPrice = elements.reduce(
      (acc, ingredient) => acc + (ingredient?.price || 0),
      0
    );
    return totalPrice;
  }

  export function getStatus(order: TOrder) {
    if (order.status === "created") {
      return "Создан";
    } else if (order.status === "created") {
      return "Готовится";
    } else {
      return "Выполнен";
    }
  }

  export function getStatusColor(status:string) {
   return status === 'Выполнен' ? '#00CCCC' : '#FFFFFF';
  }

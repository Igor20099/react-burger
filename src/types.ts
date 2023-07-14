import { store } from "./services/store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TAuthActions } from "./services/actions/auth";
import { TBurgerIngredientsActions } from "./services/actions/burger-ingredients";
import { TIngredientDetailsActions } from "./services/actions/ingredient-details";
import { TIngredientsActions } from "./services/actions/ingredients";
import { TOrderDetailsActions } from "./services/actions/order-details";
import { TOrderInfoActions } from "./services/actions/order-info";
import { TWsActions } from "./services/actions/wsActionTypes";
import { Dispatch } from "redux";
import { rootReducer } from "./services/reducers";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Типизация всех экшенов приложения
type TApplicationActions =
  | TAuthActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TOrderDetailsActions
  | TOrderInfoActions
  | TWsActions;

// Типизация thunk в нашем приложении
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
export type TIngredient = {
  _id: string;
  uniqueId?: string;
  isLocked?: boolean;
  name: string;
  type?: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  productId: string;
  count?: number;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
};

export type TUser = {
  name: string;
  email: string;
  password?: string;
  token?: string;
};

export type TWsOrders = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

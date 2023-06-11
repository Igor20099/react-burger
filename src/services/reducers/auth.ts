import { TUser } from "../../types";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  TOKEN_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
} from "../actions/auth";
import { TAuthActions } from "../actions/auth";

type TAuthState = {
  user: TUser | null;
  accessToken: string | null;
  isAuth: boolean;
};

const authInitialState: TAuthState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  isAuth: localStorage.getItem("refreshToken") ? true : false,
};

export const authorizationReducer = (
  state = authInitialState,
  action: TAuthActions
) => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: true,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth: true,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {},
        accessToken: null,
        isAuth: false,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }

    case TOKEN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
      };
    }

    default: {
      return state;
    }
  }
};

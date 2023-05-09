import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS
} from "../actions/auth";
import { getCookie } from "../../utils/cookie";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  isAuth: getCookie('token')
};

export const authorizationReducer = (state = initialState, action) => {
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

    default: {
      return state;
    }
  }
};

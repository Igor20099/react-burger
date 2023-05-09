import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS
} from "../actions/auth";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  isAuth:false
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth:true
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuth:true
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {},
        accessToken: null,
        isAuth:false
      };
    }

    default: {
      return state;
    }
  }
};

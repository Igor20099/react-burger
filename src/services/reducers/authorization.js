import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from "../actions/authorization";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: null,
  refreshToken: null,
  data: null,
  isForgotPasswordSuccess:false,
  isResetPasswordSuccess:false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isForgotPasswordSuccess: action.isForgotPasswordSuccess
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isForgotPasswordSuccess: false,
        isResetPasswordSuccess: action.isResetPasswordSuccess
      };
    }

    default: {
      return state;
    }
  }
};

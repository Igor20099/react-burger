import { Dispatch } from "redux";
import { AppDispatch, AppThunk, TUser } from "../../types";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
} from "../../utils/api";
import { delCookie, getCookie, setCookie } from "../../utils/cookie";
export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_ERROR: "REGISTER_ERROR" = "REGISTER_ERROR";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR" =
  "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" =
  "RESET_PASSWORD_ERROR";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_ERROR: "GET_USER_ERROR" = "GET_USER_ERROR";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR: "UPDATE_USER_ERROR" = "UPDATE_USER_ERROR";

export const TOKEN_REQUEST: "TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS: "TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN_ERROR: "TOKEN_ERROR" = "TOKEN_ERROR";

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  user: TUser;
  accessToken: string;
}

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  user: TUser;
  accessToken: string;
}

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  user: TUser;
}

export interface IGetUserError {
  readonly type: typeof GET_USER_ERROR;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  user: TUser;
}

export interface IUpdateUserError {
  readonly type: typeof UPDATE_USER_ERROR;
}

export interface ITokenRequest {
  readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenSuccess {
  readonly type: typeof TOKEN_SUCCESS;
}

export interface ITokenError {
  readonly type: typeof TOKEN_ERROR;
}

export type TAuthActions =
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterError
  | ILoginRequest
  | ILoginSuccess
  | ILoginError
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutError
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordError
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordError
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserError
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserError
  | ITokenRequest
  | ITokenSuccess
  | ITokenError;

export const register: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(name, email, password)
      .then((res) => {
        if (res.success) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user,
            accessToken: accessToken,
          });
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
};

export const login: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        if (res.success) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
            accessToken: accessToken,
          });
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
};

export const logout: AppThunk =
  () =>
 {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        if (res.success) {
          delCookie("token");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          return true;
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
}

export const getUser: AppThunk =
  () =>
  {
    return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return getUserRequest(getCookie("token"))
      .then((res) => {
        if (res.success) {
          console.log(res);
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        dispatch({
          type: TOKEN_REQUEST,
      })
      });
  };
}

export const updateUser: AppThunk =
  (name: string, email: string, token: string) =>
   {
    return function (dispatch:AppDispatch) {

   
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    return updateUserRequest(name, email, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
}

export const tokenRequest: AppThunk =
  () =>
{
  return function (dispatch:AppDispatch) {

 
    dispatch({
      type: TOKEN_REQUEST,
    });
    return refreshTokenRequest()
      .then((res) => {
        if (res.success) {
          console.log(res);
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          console.log(accessToken);
          delCookie("token");
          setCookie("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: TOKEN_SUCCESS,
            accessToken: accessToken,
          });
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
}

import { AppDispatch } from "../../types";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest,
} from "../../utils/api";
import { delCookie, getCookie, setCookie } from "../../utils/cookie";
export const REGISTER_REQUEST:"REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS:"REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_ERROR:"REGISTER_ERROR" = "REGISTER_ERROR";

export const LOGIN_REQUEST:"LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS:"LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_ERROR:"LOGIN_ERROR" = "LOGIN_ERROR";

export const LOGOUT_REQUEST:"LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS:"LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR:"LOGOUT_ERROR" = "LOGOUT_ERROR";

export const FORGOT_PASSWORD_REQUEST:"FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS:"FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR:"FORGOT_PASSWORD_ERROR" = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST:"RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS:"RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR:"RESET_PASSWORD_ERROR" = "RESET_PASSWORD_ERROR";

export const GET_USER_REQUEST:"GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS:"GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER__ERROR:"GET_USER_ERROR" = "GET_USER_ERROR";

export const UPDATE_USER_REQUEST:"UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS:"UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER__ERROR:"UPDATE_USER_ERROR" = "UPDATE_USER_ERROR";

export const TOKEN_REQUEST:"TOKEN_REQUEST" = "TOKEN_REQUEST";
export const TOKEN_SUCCESS:"TOKEN_SUCCESS" = "TOKEN_SUCCESS";
export const TOKEN__ERROR:"TOKEN_ERROR" = "TOKEN_ERROR";

export function register(name:string, email:string, password:string) {
  return function (dispatch:AppDispatch) {
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
}

export function login(email:string, password:string) {
  return function (dispatch:AppDispatch) {
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
}

export function logout() {
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

export function getUser() {
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
        dispatch(tokenRequest());
      });
  };
}

export function updateUser(name:string, email:string, token:string) {
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

export function tokenRequest() {
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

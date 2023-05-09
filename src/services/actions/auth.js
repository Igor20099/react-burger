import { registerRequest, loginRequest, logoutRequest } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export function register(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    return registerRequest(name, email, password).then((res) => {
      if (res.success) {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);

        dispatch({
          type: REGISTER_SUCCESS,
          user: res.user,
          accessToken: accessToken,
        });
      }
    });
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return loginRequest(email, password).then((res) => {
      if (res.success) {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user,
          accessToken: accessToken,
        });
      }
    });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return logoutRequest().then((res) => {
      if (res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }
    });
  };
}

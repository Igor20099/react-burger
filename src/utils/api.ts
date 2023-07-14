import { TOrder } from "../types";
import { BASE_URL } from "./constants";
import { getCookie } from "./cookie";

//проверка на запрос
export function checkResponse(res:Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

//запрос на игредиенты
export function ingredientsRequest() {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
}

//запрос на номер заказа
export function orderRequest(data: TOrder, token: string | undefined) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token,},
    body: JSON.stringify({
      ingredients: data
    }),
  }).then(checkResponse);
}

//запрос на регистрацию
export const registerRequest = ( email:string, password:string, name:string) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

//запрос на авторизацию
export const loginRequest = ( email:string, password:string) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: email, password }),
  }).then(checkResponse);
};

export const forgotPasswordRequest = (email:string) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const resetPasswordRequest = (password:string, token:string) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
};

//запрос на токен
export const refreshTokenRequest = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

//запрос на выход из системы
export const logoutRequest = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

//запрос данных для профиля
export const getUserRequest = (token:string | undefined) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + token,
    },
  }).then(checkResponse);
};

//обновление данных профиля
export const updateUserRequest = (email:string, name:string, token:string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ email, name }),
  }).then(checkResponse);
};

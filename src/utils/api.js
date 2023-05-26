import { BASE_URL } from "./constants";
import { getCookie } from "./cookie";

//проверка на запрос
export function checkResponse(res) {
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
export function orderRequest(data,token) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token,},
    body: JSON.stringify({
      ingredients: data
    }),
  }).then(checkResponse);
}

//запрос на регистрацию
export const registerRequest = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

//запрос на авторизацию
export const loginRequest = ({ email, password }) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: email, password }),
  }).then(checkResponse);
};

export const forgotPasswordRequest = (email) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const resetPasswordRequest = (password, token) => {
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
export const getUserRequest = (token) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + token,
    },
  }).then(checkResponse);
};

//обновление данных профиля
export const updateUserRequest = (email, name, token) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ email, name }),
  }).then(checkResponse);
};

import { checkResponse } from "../../utils/utils";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export function register(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:email,
          password:password,
          name:name
        }),
      })
        .then(checkResponse)
        .then((res) => {
          if (res.success) {
            dispatch({ type: REGISTER_SUCCESS, payload: res });
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
}

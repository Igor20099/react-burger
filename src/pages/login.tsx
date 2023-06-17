import styles from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from '../hooks';
import { useEffect, useState } from "react";
import { login } from "../services/actions/auth";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie } from "../utils/cookie";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuth} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      if (
        location.state?.from.pathname === "/" ||
        location.state?.from.pathname === "/profile" ||
        location.state?.from.pathname === "/profile/orders"
      ) {
        navigate(location.state?.from.pathname);
      } else {
        navigate("/profile");
      }
    }
  });

  const changeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function loginHandle(e:React.SyntheticEvent) {
    e.preventDefault();
    dispatch(login( email, password ));
  }

  return (
    <div>
      <form className={styles.form} onSubmit={loginHandle}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <EmailInput
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          onChange={changeEmail}
        />
        <PasswordInput
          name={"password"}
          extraClass="mb-6"
          value={password}
          onChange={changePassword}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Вход
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

import styles from "./login.module.css";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../services/actions/auth";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.accessToken)
  console.log(token)


  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  function loginHandle(e) {
    e.preventDefault();
    dispatch(login({email, password})).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className={styles.login}>
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
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={loginHandle}
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
    </div>
  );
}

export default LoginPage;

import { useState } from "react";
import styles from "./forgot-password.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { forgotPasswordRequest } from "../utils/api";
import { useEffect } from "react";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  function changeEmail(e) {
    setEmail(e.target.value);
  }
  useEffect(() => {

  })
  
  function forgotPasswordHandle(e) {
    e.preventDefault();
    forgotPasswordRequest(email).then(() => {
      localStorage.setItem('forgotPassword', true);
      navigate("/reset-password");
    }).catch((err) => {
      console.error('Error: ', err);
  });;
  }
  return (
    <div>
      <form className={styles.form} onSubmit={forgotPasswordHandle}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <EmailInput
          value={email}
          onChange={changeEmail}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;

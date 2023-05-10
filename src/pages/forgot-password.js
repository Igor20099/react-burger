import { useState } from "react";
import styles from "./forgot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch} from "react-redux";
import { forgotPasswordRequest } from "../utils/api";


function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function forgotPasswordHandle() {
    forgotPasswordRequest(email).then(() => {
      navigate('/reset-password')
    })
  }
  return (
    <div>
      <form className={styles.form}>
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
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={forgotPasswordHandle}
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

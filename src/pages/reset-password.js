import styles from "./reset-password.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const forgotPassword = localStorage.getItem("forgotPassword");

  useEffect(() => {
    if (!forgotPassword) {
      // Redirect to the forgot-password page
      navigate("/forgot-password");
      
    }else {
      localStorage.removeItem("forgotPassword");
    }
  }, []);
  
  console.log(forgotPassword);

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function changeToken(e) {
    setToken(e.target.value);
  }

  function resetPasswordHandle(e) {
    e.preventDefault();
    resetPasswordRequest(password, token).then(() => {
      navigate("/login");
    });
  }

  return (
    <div>
      <form className={styles.form} onSubmit={resetPasswordHandle}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <PasswordInput
          name={"password"}
          extraClass="mb-6"
          placeholder="Введите новый пароль"
          value={password}
          onChange={changePassword}
        />
        <Input
          type={"text"}
          value={token}
          onChange={changeToken}
          placeholder={"Введите код из письма"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
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

export default ResetPasswordPage;

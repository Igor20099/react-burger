import styles from "./reset-password.module.css";
import { useState, useEffect,SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch,useSelector } from '../hooks';
import { resetPasswordRequest } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const forgotPassword = localStorage.getItem("forgotPassword");

  useEffect(() => {
    if (!forgotPassword) {
      navigate("/forgot-password");
      
    }else {
      localStorage.removeItem("forgotPassword");
    }
  }, []);
  
  function changePassword(e:React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function changeToken(e:React.ChangeEvent<HTMLInputElement>) {
    setToken(e.target.value);
  }

  function resetPasswordHandle(e:SyntheticEvent) {
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

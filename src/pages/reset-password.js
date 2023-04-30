import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPasswordPage() {
  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput name={"password"} extraClass="mb-6" placeholder="Введите новый пароль"/>
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;

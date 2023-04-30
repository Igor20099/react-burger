import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function RegisterPage() {
  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <EmailInput value="" name={"email"} isIcon={false} extraClass="mb-6" />
      <PasswordInput name={"password"} extraClass="mb-6" />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
      Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
        Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;

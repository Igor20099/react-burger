import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function LoginPage() {
  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <EmailInput value="" name={"email"} isIcon={false} extraClass="mb-6" />
      <PasswordInput name={"password"} extraClass="mb-6" />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Вход
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;

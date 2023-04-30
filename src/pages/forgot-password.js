import styles from "./login.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
    const navigate = useNavigate()
  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        value=""
        name={"email"}
        isIcon={false}
        extraClass="mb-6"
        placeholder="Укажите e-mail"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={() => navigate('/reset-password')}>
        Восстановить
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

export default ForgotPasswordPage;

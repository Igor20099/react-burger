import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../services/actions/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  useEffect(() => {}, []);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  function registerHandle(e) {
    e.preventDefault();
    dispatch(register({name, email, password})).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });;
  }

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={registerHandle}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onChange={changeName}
        />
        <EmailInput
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          value={email}
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;

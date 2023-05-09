import styles from "./login.module.css";
import {useState} from 'react'
import { Link } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch,useSelector } from "react-redux";
import { resetPasswordRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isResetPasswordSuccess = useSelector(state => state.auth.isResetPasswordSuccess)
  const [password,setPassword] = useState('')
  const [token,setToken] = useState('')

  function changePassword(e) {
    setPassword(e.target.value)
  }

  function changeToken(e) {
    setToken(e.target.value)
  }

  function resetPasswordHandle () {
    resetPasswordRequest(password, token).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput name={"password"} extraClass="mb-6" placeholder="Введите новый пароль" value={password} onChange={changePassword}/>
      <Input
        type={"text"}
        value = {token}
        onChange={changeToken}
        placeholder={"Введите код из письма"}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={resetPasswordHandle}>
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

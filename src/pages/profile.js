import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { getUser, logout, updateUser } from "../services/actions/auth";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookie";

function ProfilePage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChange, setIsChange] = useState(false);
  const token = getCookie('token')
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getUser(token)).then(() => {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    });
    
  }, [dispatch]);

  function cancelChange() {
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setIsChange(false);
  }

  function saveChange() {
    dispatch(updateUser( email, name,token)).then(() => {
      setIsChange(false)
    })
  }

  function logoutHandle() {
    dispatch(logout());
  }

  function changeName(e) {
    setIsChange(true);
    setName(e.target.value);
  }

  function changeEmail(e) {
    setIsChange(true);
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setIsChange(true);
    setPassword(e.target.value);
  }

  return (
    <div className={styles.profile}>
      <ul className={styles.nav}>
        <li className="text text_type_main-medium mb-8">
          <NavLink to="/profile" className={styles.link_active}>
            Профиль
          </NavLink>
        </li>
        <li className="mb-8">
          <NavLink to="/profile/orders" className={styles.link}>
            <span className="text text_type_main-medium text_color_inactive">
              История заказов
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.link}>
            <span
              className="text text_type_main-medium text_color_inactive"
              onClick={logoutHandle}
            >
              Выход
            </span>
          </NavLink>
        </li>
      </ul>
      <div>
        <EmailInput
          type={"text"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          isIcon={true}
          value={name}
          onChange={changeName}
        />
        <EmailInput
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
      
          value={email}
          onChange={changeEmail}
        />
        <PasswordInput
          name={"password"}
          icon="EditIcon"
          value={password}
          onChange={changePassword}
        />

        <div className={isChange ? styles.btns_visible : styles.btns_invisible}>
          <Button type="primary" size="small" onClick={saveChange} >
            <p className="text text_type_main-default">Сохранить</p>
          </Button>
          <Button type="primary" size="small" onClick={cancelChange}>
            <p className="text text_type_main-default">Отмена</p>
          </Button>
        </div>
      </div>

      <p className={styles.text}>
        <span className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </span>
      </p>
    </div>
  );
}

export default ProfilePage;

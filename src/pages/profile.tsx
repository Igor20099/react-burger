import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import {
  getUser,
  logout,
  tokenRequest,
  updateUser,
} from "../services/actions/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../hooks";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser())
    
    // .then(() => {
    //   setName(user.name || "");
    //   setEmail(user.email || "");
    //   setPassword("");
    // });
  }, []);

  function cancelChange() {
    // setName(user.name);
    // setEmail(user.email);
    setPassword("");
    setIsChange(false);
  }

  function saveChange() {
    dispatch(updateUser(email, name, getCookie("token")!))
    
    // .then(() => {
    //   setIsChange(false);
    // });
  }

  function logoutHandle() {
    dispatch(logout());
  }

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChange(true);
    setName(e.target.value);
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChange(true);
    setEmail(e.target.value);
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChange(true);
    setPassword(e.target.value);
  }

  console.log(getCookie("token"));

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
        <li className="mt-20">
          {" "}
          <p className={styles.text}>
            <span className="text text_type_main-small text_color_inactive">
              В этом разделе вы можете изменить&nbsp;свои персональные данные
            </span>
          </p>
        </li>
      </ul>
      <div>
        <EmailInput
          placeholder={"Имя"}
          name={"name"}
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
          <Button
            type="primary"
            size="small"
            onClick={saveChange}
            htmlType="button"
            extraClass="mr-4"
          >
            <p className="text text_type_main-default">Сохранить</p>
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={cancelChange}
            htmlType="button"
          >
            <p className="text text_type_main-default">Отмена</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

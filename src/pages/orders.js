import styles from "./profile.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { logout } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function OrdersPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logoutHandle() {
    dispatch(logout())
  }

  return (
    <div className={styles.profile}>
      <ul className={styles.nav}>
        <li ><NavLink to='/profile' className={styles.link}><span className="text text_type_main-medium text_color_inactive">Профиль</span></NavLink></li>
        <li className="mb-8"><NavLink to="/profile/orders" className={styles.link_active}><span className="text text_type_main-medium">История заказов</span></NavLink></li>
        <li><NavLink to="/login" className={styles.link}><span className="text text_type_main-medium text_color_inactive" onClick={logoutHandle}>Выход</span></NavLink></li>
      </ul>
      
      <p className={styles.text}><span className="text text_type_main-small text_color_inactive">В этом разделе вы можете
изменить&nbsp;свои персональные данные</span></p>
    </div>
  );
}

export default OrdersPage;

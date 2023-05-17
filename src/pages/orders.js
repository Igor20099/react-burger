import styles from "./orders.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { logout } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import FeedOrder from "../components/feed-order/feed-order";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActionTypes";
import { WS_URL } from "../utils/constants";

function OrdersPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {ingredients} = useSelector(state => state.ingredients)
  const { orders } = useSelector((state) => state.ws);
  const [profileOrders,setProfileOrders] = useState([])
  console.log(orders.orders)
  console.log(getCookie('token'))

  useEffect(() => {
    
    dispatch({ type: WS_CONNECTION_START, payload: WS_URL + `?token=${getCookie('token')}` });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setProfileOrders(orders.orders);
      
    }
  }, [orders, ingredients]);

  function logoutHandle() {
    dispatch(logout())
  }

  return (
    <div className={styles.profile}>
      <ul className={styles.nav}>
        <li className="mb-8"><NavLink to='/profile' className={styles.link}><span className="text text_type_main-medium text_color_inactive">Профиль</span></NavLink></li>
        <li className="mb-8"><NavLink to="/profile/orders" className={styles.link_active}><span className="text text_type_main-medium">История заказов</span></NavLink></li>
        <li><NavLink to="/login" className={styles.link}><span className="text text_type_main-medium text_color_inactive" onClick={logoutHandle}>Выход</span></NavLink></li>
        <li className="mt-20">
          {" "}
          <p className={styles.text}>
            <span className="text text_type_main-small text_color_inactive">
              В этом разделе вы можете изменить&nbsp;свои персональные данные
            </span>
          </p>
        </li>
      </ul>
      <div className={styles.order_list}>
        <ul className={styles.list}>
          {profileOrders &&
            profileOrders.map((el) => {
              return (
                <FeedOrder key={el._id} el={el} ingredients={ingredients} />
              );
            })}
        </ul>
      </div>
      
    </div>
  );
}

export default OrdersPage;

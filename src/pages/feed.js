import { useEffect, useState } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActionTypes";
import { v4 as uuidv4 } from "uuid";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedOrder from "../components/feed-order/feed-order";
import { WS_URL } from "../utils/constants";
function FeedPage() {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState();
  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const { orders } = useSelector((state) => state.ws);
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: WS_URL + '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setAllOrders(orders.orders);
      setOrdersCount(orders.total);
      setOrdersToday(orders.totalToday);
    }
  }, [orders, ingredients]);
  return (
    <section className={styles.feed}>
      <div className={styles.order_list}>
        <h2 className="text text_type_main-medium mb-5">Лента заказов</h2>
        <ul className={styles.list}>
          {allOrders &&
            allOrders.map((el) => {
              return (
                <FeedOrder key={el._id} el={el} ingredients={ingredients} />
              );
            })}
        </ul>
      </div>
      <div className={styles.info_orders}>
        <div className={styles.wrapper_list_orders}>
          <div className={styles.orders_done}>
            <p className="text text_type_main-small mb-6">Готовы:</p>
            <ul className={styles.list_done}>
              {allOrders &&
                allOrders.slice(0, 10).map((el) => {
                  return el.status === "done" ? (
                    <li
                      className={`text text_type_digits-default ${styles.done_number}`}
                    >
                      {el.number}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
          <div className={styles.orders_progress}>
            <p className="text text_type_main-small">В работе:</p>
            <ul className={styles.list_progress}>
              {allOrders &&
                allOrders.slice(0, 10).map((el) => {
                  return el.status === "pending" ? (
                    <li className="text text_type_digits-default">
                      {el.number}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <p className="text text_type_main-default">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{ordersCount}</p>
        </div>
        <div className={styles.count_today_time}>
          <p className="text text_type_main-default">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{ordersToday}</p>
        </div>
      </div>
    </section>
  );
}

export default FeedPage;

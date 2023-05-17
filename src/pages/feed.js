import { useEffect, useState } from "react";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/wsActionTypes";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function FeedPage() {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState();
  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);

  const { orders } = useSelector((state) => state.ws);
  const { ingredients } = useSelector((state) => state.ingredients);
  console.log(orders);

  function getPrice(elementIngredients, ingredients) {
    const elements = elementIngredients.map((id) =>
      ingredients.find((el) => el._id === id)
    );
    console.log(elements);
    const totalPrice = elements.reduce(
      (acc, ingredient) => acc + ingredient?.price,
      0
    );
    return totalPrice;
  }

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

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
  console.log(allOrders);
  return (
    <section className={styles.feed}>
      <div className={styles.order_list}>
        <h2 className="text text_type_main-medium mb-5">Лента заказов</h2>
        <ul className={styles.list}>
          {allOrders &&
            allOrders.map((el) => {
              return (
                <li key={el._id} className={styles.order}>
                  <div className={styles.wrapper}>
                    <p className="text text_type_digits-default pt-6">{`#${el.number}`}</p>
                    <p className="text text_type_main-default text_color_inactive pt-6">
                      {el.createdAt}
                    </p>
                  </div>

                  <p className="text text_type_main-medium p-6">{el.name}</p>
                  <div className={styles.wrapper}>
                    <div className={styles.icons}>
                      {el.ingredients.slice(0, 5).map((id) => {
                        const ingredient = ingredients.find(
                          (el) => el._id === id
                        );
                        const image = ingredient?.image_mobile;
                        const name = ingredient?.name;
                        return (
                          <div className={styles.image_wrapper}>
                            <img
                              src={image}
                              alt={name}
                              className={styles.icon}
                            />
                          </div>
                        );
                      })}
                      {el.ingredients.length > 5 ? (
                        <div className={styles.number_wrapper}>
                          <p
                            className={`text text_type_digits-default pt-6 pl-4 ${styles.number}`}
                          >
                            +{el.ingredients.length - 5}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.price}>
                      <p className="text text_type_digits-default pr-2">
                        {getPrice(el.ingredients, ingredients)}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
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
                allOrders.slice(0,5).map((el) => {
                  return el.status === "done" ? (
                    <li className={`text text_type_digits-default ${styles.done_number}`}>
                      {el.number}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
          <div className={styles.orders_progress}>
            <p className="text text_type_main-small">В работе:</p>
            <ul>
              {allOrders &&
                allOrders.map((el) => {
                  return el.status !== "done" ? (
                    <li className="text text_type_digits-default">
                      {el.number}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
        </div>
        <div className='mb-6'>
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

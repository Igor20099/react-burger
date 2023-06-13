import styles from "./order-info.module.css";
import { useDispatch,useSelector } from '../../hooks';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/order-info";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getPrice, getStatus, getStatusColor } from "../../utils/utils";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActionTypes";
import { WS_URL } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils/cookie";
import { TIngredient, TOrder } from "../../types";



function OrderInfo() {
  const ordersAll = useSelector((state) => state.ws.orders.orders);
  const { order } = useSelector((state) => state.orderInfo);
  const { ingredients } = useSelector((state) => state.ingredients);
  const location = useLocation();
  const dispatch = useDispatch();
  const [childIngreients, setChildIngredients] = useState<Array<TIngredient>>([]);
  const [ingredientsCount, setIngredientsCount] = useState<{ [key: string]: number } >({});
  const [orders, setOrders] = useState([]);
  let listTemp:{ [key: string]: any }  = {};
  const { id } = useParams();
  let ingredientSet = new Set<string>();
  let ingredientList:Array<TIngredient> = [];

  let pathArray:Array<string> = location.pathname.split("/");
  let path:string = pathArray.slice(0, pathArray.length - 1).join("/");

  useEffect(() => {
    if (path === "/feed") {
      dispatch({ type: WS_CONNECTION_START, payload: WS_URL + "/all" });
    } else  if (path === '/profile/orders'){
      dispatch({
        type: WS_CONNECTION_START,
        payload: WS_URL + `?token=${getCookie("token")}`,
      });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);
  useEffect(() => {
     setOrders(ordersAll)
    orders?.find((el:TOrder) => {
      if (id === el._id) {
        dispatch(getOrder(el));
      }
    });

    if (order) {
      order.ingredients.forEach((el) => {
        ingredientSet.add(el);
      });
      ingredientSet.forEach((id) => {
        const count = order.ingredients.filter((ing) => ing === id);
        listTemp[id] = count.length;
        const ingredient = ingredients.find((el) => el._id === id);
        if (ingredient) {
          ingredientList.push(ingredient);
        }
        
      });
      setIngredientsCount(listTemp);
      setChildIngredients(ingredientList);
    }
  }, [orders, ordersAll,  id, order, ingredients]);

  return (
    <div className={styles.order}>
      {order && (
        <>
          <p className={`text text_type_digits-default ${styles.number}`}>
            #{order.number}
          </p>
          <p className="text text_type_main-default mb-3">{order.name}</p>
          <p
            className="text text_type_main-small mb-15"
            style={{ color: getStatusColor(getStatus(order)) }}
          >
            {getStatus(order)}
          </p>
          <p className="text text_type_main-default mb-6">Состав:</p>
          <ul className={styles.list}>
            {childIngreients?.map((el) => {
              return (
                <li key={uuidv4()} className={styles.ingredient}>
                  <img
                    src={el.image_mobile}
                    alt={el.name}
                    className={styles.image}
                  />
                  <p className={`text text_type_main-default ${styles.name}`}>
                    {el.name}
                  </p>
                  <div className={styles.count_price_wrapper}>
                    <p className="mr-2">{`${ingredientsCount[el._id]} x ${
                      el.price
                    }`}</p>
                    <CurrencyIcon type='primary'/>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.wrapper}>
            <p className="text text_type_main-default text_color_inactive pt-6">
              {<FormattedDate date={new Date(order.createdAt)} />}
            </p>
            <div className={styles.price}>
              <p className="mr-2">{getPrice(order.ingredients, ingredients)}</p>{" "}
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderInfo;

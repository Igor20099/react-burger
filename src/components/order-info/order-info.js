import styles from "./order-info.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/actions/order-info";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getPrice,getStatus } from "../../utils/utils";

function OrderInfo() {
  const { orders } = useSelector((state) => state.ws);
  const { order } = useSelector((state) => state.orderInfo);
  const { ingredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const [childIngreients, setChildIngredients] = useState(null);
  const [ingredientsCount, setIngredientsCount] = useState({});
  let listTemp = {};

  const { id } = useParams();
  let ingredientSet = new Set();
  let ingredientList = [];

  useEffect(() => {
    orders.orders.find((el) => {
      if (id === el._id) {
        dispatch(getOrder(el));
      }
    });

    if (order) {
      order.ingredients.forEach((el) => {
        ingredientSet.add(el);
      });
      console.log(ingredientSet);
      ingredientSet.forEach((id) => {
        const count = order.ingredients.filter((ing) => ing === id);
        listTemp[id] = count.length;

        console.log(ingredientsCount);
        const ingredient = ingredients.find((el) => el._id === id);
        ingredientList.push(ingredient);
      });
      setIngredientsCount(listTemp);
      setChildIngredients(ingredientList);
    }
  }, [orders, id, dispatch, ingredients, order, setChildIngredients]);




  return (
    <div className={styles.order}>
      {order && (
        <>
          <p className={`text text_type_digits-default ${styles.number}`}>
            #{order.number}
          </p>
          <p className="text text_type_main-default mb-3">{order.name}</p>
          <p className="text text_type_main-small mb-15">{getStatus(order)}</p>
          <p className="text text_type_main-default mb-6">Состав:</p>
          <ul className={styles.list}>
            {childIngreients?.map((el) => {
              return (
                <li className={styles.ingredient}>
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
                    <CurrencyIcon />
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
              <CurrencyIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderInfo;

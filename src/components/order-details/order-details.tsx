
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch,useSelector } from '../../hooks';
import { useState } from "react";

function OrderDetails() {

  const order = useSelector(state => state.orderDetails.order)
  


  return (
    <div className={styles.order}>
      {order && <p className="text text_type_digits-large mb-8">{order.order.number}</p>}
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.done}>
        {" "}
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;

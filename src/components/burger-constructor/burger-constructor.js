import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { DataContext } from "../../services/dataContext";

function BurgerConstructor() {
  const [visible, setVisible] = React.useState(false);
  const data = React.useContext(DataContext);
  const [order,setOrder] = React.useState({})

  const bun = data.find((item) => item.type === "bun");

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const getOrder = () => {
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: data.map((el) => {
          return el._id;
        }),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((res) => {
        if (res.success) {
          setOrder(res);
          handleOpenModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails order ={order.order}/>
    </Modal>
  );

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.modal}> {visible && modal}</div>

      {bun ? (
        <div className="ml-8 mr-2">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.element}
          />
        </div>
      ) : null}

      <ul className={styles.burger_list}>
        {data.map((el, index) => {
          if (!el.isLocked && el.type !== "bun") {
            return (
              <li key={index} className={styles.item}>
                <DragIcon type="primary"></DragIcon>
                <ConstructorElement
                  type={el.type}
                  isLocked={el.isLocked}
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                  extraClass="ml-2"
                />
              </li>
            );
          }
        })}
      </ul>

      {bun ? (
        <div className="ml-8 mr-2">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={styles.element}
          />
        </div>
      ) : null}

      <div className={styles.burger_info}>
        <div className={styles.price}>
          <p className="text text_type_main-large mr-2">
            {data.reduce((acc, ingredient) => acc + ingredient.price, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={getOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf( PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired
  )
};

export default BurgerConstructor;

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

function BurgerConstructor({ ingredients }) {
  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      handleCloseModal();
    }
  };
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  });

  const modal = (
    <Modal onClose={handleCloseModal} onClick={handleOverlayClose}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.modal}> {visible && modal}</div>
      {ingredients.map((el, index) => {
        if (el.type === "bun") {
          return (
            <div key={index} className="ml-8 mr-2">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${el.name} (верх)`}
                price={el.price}
                thumbnail={el.image}
                extraClass={styles.element}
              />
            </div>
          );
        }
      })}
      <ul className={styles.burger_list}>
        {ingredients.map((el, index) => {
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
      {ingredients.map((el, index) => {
        if (el.type === "bun") {
          return (
            <div key={index} className="ml-8 mr-2">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${el.name} (низ)`}
                price={el.price}
                thumbnail={el.image}
                extraClass={styles.element}
              />
            </div>
          );
        }
      })}

      <div className={styles.burger_info}>
        <div className={styles.price}>
          <p className="text text_type_main-large mr-2">
            {ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerConstructor;

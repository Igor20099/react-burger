import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { getOrder, CLOSE_ORDER } from "../../services/actions/order-details";
import { useDrop, useDrag } from "react-dnd";
import { countUp, countDown, deleteIngredient } from "../../services/actions/burger-ingredients";
import ConstructorIngredient from "../constuctor-ingredient/constructor-ingredient";

function BurgerConstructor({ onDropHandler }) {
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state.orderDetails);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      onDropHandler(itemId);
      dispatch(countUp(itemId._id,itemId.type))
    },
  });

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const bun = useSelector((state) => state.burgerIngredients.bun);

  const handleOpenModal = () => {
    dispatch(getOrder(ingredients));
  };

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_ORDER });
  };

  const onDelete = (el) => {
    dispatch(deleteIngredient(el.uniqueId));
    dispatch(countDown(el._id,el.type))
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.modal}> {order && modal}</div>

      <div className={styles.ingredients_container} ref={dropTarget}>
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
          {ingredients.map((el, i) => {
            if (!el.isLocked && el.type !== "bun") {
              return (
                <ConstructorIngredient
                  key={el.uniqueId}
                  el={el}
                  index={i}
                  onDelete={onDelete}
                />
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
      </div>
      <div className={styles.burger_info}>
        <div className={styles.price}>
          <p className="text text_type_main-large mr-2">
            {bun
              ? ingredients.reduce(
                  (acc, ingredient) => acc + ingredient.price,
                  0
                ) +
                bun.price * 2
              : ingredients.reduce(
                  (acc, ingredient) => acc + ingredient.price,
                  0
                )}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
};

export default BurgerConstructor;

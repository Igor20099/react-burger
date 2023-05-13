import { useEffect } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { getOrder, CLOSE_ORDER } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import {
  countUp,
  countDown,
  deleteIngredient,
} from "../../services/actions/burger-ingredients";
import ConstructorIngredient from "../constuctor-ingredient/constructor-ingredient";
import { v4 as uuidv4 } from "uuid";
import { addIngredient } from "../../services/actions/burger-ingredients";
import { useLocation, useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrop = (ingredient) => {
    dispatch(addIngredient(ingredient, uuidv4()));
  };

  const { order } = useSelector((state) => state.orderDetails);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      handleDrop(itemId);
      dispatch(countUp(itemId._id, itemId.type));
    },
  });

  const burgerIngredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const bun = useSelector((state) => state.burgerIngredients.bun);
  const ingredients = useSelector((state) => state.ingredients);

  useEffect(() => {
    const buns = ingredients.ingredients.filter((item) => item.type === "bun");

    buns.forEach((element) => {
      if (bun && element._id !== bun._id) {
        dispatch(countDown(element._id, element.type));
      }
    });
  }, [bun, dispatch]);

  const handleOpenModal = () => {
    isAuth
      ? dispatch(getOrder(burgerIngredients))
      : navigate("/login", {
          state: { from: { pathname: location.pathname } },
        });
  };

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_ORDER });
  };

  const onDelete = (el) => {
    dispatch(deleteIngredient(el.uniqueId));
    dispatch(countDown(el._id, el.type));
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
          {burgerIngredients.map((el, i) => {
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
              ? burgerIngredients.reduce(
                  (acc, ingredient) => acc + ingredient.price,
                  0
                ) +
                bun.price * 2
              : burgerIngredients.reduce(
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

export default BurgerConstructor;

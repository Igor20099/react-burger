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
import { useDispatch, useSelector } from "../../hooks";
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
import { useState, FunctionComponent } from "react";
import { TIngredient } from "../../types";

interface IBurgerConstuctor {
  setIsModal: (isModal: boolean) => void;
}

const BurgerConstructor: FunctionComponent<IBurgerConstuctor> = ({
  setIsModal,
}) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [ingredientsOrder, setIngredientsOrder] = useState([]);

  const handleDrop = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient, uuidv4()));
  };
  const { order } = useSelector((state) => state.orderDetails);
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: TIngredient) {
      handleDrop(itemId);
      if (itemId.type) {
        dispatch(countUp(itemId._id, itemId.type));
      }
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
      if (bun && element.type && element._id !== bun._id) {
        dispatch(countDown(element._id, element.type));
      }
    });
  }, [bun, dispatch]);
  console.log(burgerIngredients);

  const handleOpenModal = () => {
    if (isAuth) {
      if (bun && burgerIngredients.length > 0) {
        dispatch(getOrder([bun, ...burgerIngredients, bun]));
      }
    } else {
      navigate("/login", {
        state: { from: { pathname: location.pathname } },
      });
    }
    setIsModal(false);
  };

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_ORDER });
    localStorage.setItem("isModal", JSON.stringify(false));
  };

  const onDelete = (el: TIngredient) => {
    if (el.uniqueId) {
      dispatch(deleteIngredient(el.uniqueId));
    }
    if (el.type) {
      dispatch(countDown(el._id, el.type));
    }
  };

  const modal = (
    <Modal onClose={handleCloseModal} setIsModal={setIsModal}>
      <OrderDetails />
    </Modal>
  );

  console.log(burgerIngredients);
  console.log(ingredientsOrder);
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
};

export default BurgerConstructor;

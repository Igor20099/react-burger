import React, { useRef } from "react";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import {
  getIngredient,
  deleteIngredient,
} from "../../services/actions/ingredient-details";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

function BurgerIngredients() {
  const { ingredients } = useSelector((state) => state.ingredients);
  const [current, setCurrent] = React.useState("one");
  const { ingredient } = useSelector((state) => state.ingredientDetails);
  console.log(ingredient)
  const ingredientsContainerRef = useRef(null);
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauseRef = useRef(null);

  const dispatch = useDispatch();

  const handleScroll = () => {
    if (
      bunRef.current.getBoundingClientRect().top ===
        ingredientsContainerRef.current.getBoundingClientRect().top &&
      bunRef.current.getBoundingClientRect().bottom >
        ingredientsContainerRef.current.getBoundingClientRect().top
    ) {
      setCurrent("one");
    } else if (
      sauseRef.current.getBoundingClientRect().top <=
        ingredientsContainerRef.current.getBoundingClientRect().top &&
      sauseRef.current.getBoundingClientRect().bottom >
        ingredientsContainerRef.current.getBoundingClientRect().top
    ) {
      setCurrent("two");
    } else if (
      mainRef.current.getBoundingClientRect().top <=
        ingredientsContainerRef.current.getBoundingClientRect().top &&
      mainRef.current.getBoundingClientRect().bottom >
        ingredientsContainerRef.current.getBoundingClientRect().top
    ) {
      setCurrent("three");
    }
  };

  React.useEffect(() => {
    dispatch(getIngredients());
    document
      .querySelector("#ingredients-container")
      .addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenModal = (e) => {
    ingredients.forEach((el) => {
      if (e.currentTarget.id === el._id) {
        dispatch(getIngredient(el));
      }
    });
  };

  const handleCloseModal = () => {
    dispatch(deleteIngredient());
  };

  const modal = (
    <Modal onClose={handleCloseModal} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );

  return (
    <section className={styles.burger_ingredients}>
      <div className={styles.modal}> {ingredient && modal}</div>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div
        id="ingredients-container"
        className={styles.ingredients_container}
        ref={ingredientsContainerRef}
      >
        <div className="bun-container" ref={bunRef}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={styles.bun_conteiner}>
            {ingredients.map((el) => {
              if (el.type === "bun") {
                return (
                  <DraggableIngredient key={el._id} handleOpenModal={handleOpenModal} ingredient={el}/>
                );
              }
            })}
          </ul>
        </div>
        <div className="sauce-container" ref={sauseRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={styles.bun_conteiner}>
            {ingredients.map((el) => {
              if (el.type === "sauce") {
                return (
                  <DraggableIngredient key={el._id}  handleOpenModal={handleOpenModal} ingredient={el}/>
                );
              }
            })}
          </ul>
        </div>
        <div className="main-container" ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={styles.bun_conteiner}>
            {ingredients.map((el) => {
              if (el.type === "main") {
                return (
                  <DraggableIngredient key={el._id}  handleOpenModal={handleOpenModal} ingredient={el}/>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
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

export default BurgerIngredients;

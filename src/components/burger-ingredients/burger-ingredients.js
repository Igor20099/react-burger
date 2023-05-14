import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import {
  getIngredient,
  deleteIngredient,
} from "../../services/actions/ingredient-details";
import { useNavigate } from "react-router-dom";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function BurgerIngredients({ setIsModal }) {
  const { ingredients } = useSelector((state) => state.ingredients);
  const [current, setCurrent] = React.useState("one");
  const ingredientsContainerRef = useRef(null);
  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauseRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
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
   

    const container = document.querySelector("#ingredients-container");
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [ingredients]);

 
  const handleOpenModal = (e) => {
    ingredients.forEach((el) => {
      if (e.currentTarget.id === el._id) {
        setIsModal(true);
        navigate(`/ingredients/${el._id}`, { state: { background: location } });
      }
    });
  };

  const handleCloseModal = () => {
    dispatch(deleteIngredient());
    setIsModal(false);

    navigate("/");
  };

  return (
    <section className={styles.burger_ingredients}>
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
                  <DraggableIngredient
                    key={el._id}
                    handleOpenModal={handleOpenModal}
                    ingredient={el}
                  />
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
                  <DraggableIngredient
                    key={el._id}
                    handleOpenModal={handleOpenModal}
                    ingredient={el}
                  />
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
                  <DraggableIngredient
                    key={el._id}
                    handleOpenModal={handleOpenModal}
                    ingredient={el}
                  />
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
  setIsModal:PropTypes.func
};

export default BurgerIngredients;

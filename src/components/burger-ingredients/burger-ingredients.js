import React from "react";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { DataContext } from "../../services/dataContext";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  const [ingredient, setIngredient] = React.useState(null);
  const data = React.useContext(DataContext);

  const handleOpenModal = (e) => {
    data.forEach((el) => {
      if (e.currentTarget.id === el._id) {
        setIngredient(el);
      }
    });
  };

  const handleCloseModal = () => {
    setIngredient(null);
  };

  const modal = (
    <Modal onClose={handleCloseModal} title="Детали ингредиента">
      <IngredientDetails ingredient={ingredient} />
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
      <div className={styles.ingredients_container}>
        <div className="bun-container">
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "bun") {
                return (
                  <li
                    key={el._id}
                    id={el._id}
                    className={styles.burger_item}
                    onClick={handleOpenModal}
                  >
                    <img
                      src={el.image}
                      alt={el.name}
                      className="mr-4 ml-4 mb-1"
                    />
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-medium mr-2">
                        {el.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>

                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="sauce-container">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "sauce") {
                return (
                  <li
                    key={el._id}
                    id={el._id}
                    className={styles.burger_item}
                    onClick={handleOpenModal}
                  >
                    <img src={el.image} alt={el.name}></img>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-medium mr-2">
                        {el.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="main-container">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={styles.bun_conteiner}>
            {data.map((el) => {
              if (el.type === "main") {
                return (
                  <li
                    key={el._id}
                    id={el._id}
                    className={styles.burger_item}
                    onClick={handleOpenModal}
                  >
                    <img src={el.image} alt={el.name}></img>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <div className={styles.price}>
                      <p className="text text_type_main-default mr-2">
                        {el.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                    <p className="text text_type_main-small">{el.name}</p>
                  </li>
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
}

export default BurgerIngredients;

import React from "react";
import styles from "./draggable-ingredient.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function DraggableIngredient({ ingredient, handleOpenModal }) {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  const burgerIngredients = useSelector(
    (state) => state.burgerIngredients.counts
  );

  let count = burgerIngredients[ingredient._id];
  return (
    <li
      id={ingredient._id}
      ref={dragRef}
      className={styles.burger_item}
      onClick={handleOpenModal}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className="mr-4 ml-4 mb-1"
      />
      {count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
      <div className={styles.price}>
        <p className="text text_type_main-medium mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-small">{ingredient.name}</p>
    </li>
  );
}

DraggableIngredient.propTypes = {
  ingredient: PropTypes.shape({
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
  }).isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

export default DraggableIngredient;

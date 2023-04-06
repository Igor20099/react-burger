import React from 'react'
import styles from './draggable-ingredient.module.css'
import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";

function DraggableIngredient({ingredient, handleOpenModal}) {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });

    return (
        <li
        id={ingredient._id}
        ref ={dragRef}
        className={styles.burger_item}
        onClick={handleOpenModal}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="mr-4 ml-4 mb-1"
        />
        <Counter count={1} size="default" extraClass="m-1" />
        <div className={styles.price}>
          <p className="text text_type_main-medium mr-2">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-small">{ingredient.name}</p>
      </li>
    )
}

export default DraggableIngredient;
import { FunctionComponent } from "react";
import styles from "./draggable-ingredient.module.css";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../hooks";
import { TIngredient } from "../../types";

interface IDraggableIngredient {
  ingredient: TIngredient;
  handleOpenModal: (e:React.SyntheticEvent) => void;
}

const DraggableIngredient: FunctionComponent<IDraggableIngredient> = ({
  ingredient,
  handleOpenModal,
}) => {
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
};

export default DraggableIngredient;

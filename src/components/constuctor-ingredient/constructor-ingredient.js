import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useRef } from "react";

import styles from "./constructor-ingredient.module.css";
import { moveIngredient } from "../../services/actions/burger-ingredients";

function ConstructorIngredient({ el, onDelete, index }) {
  const id = el._id;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "ingredientConstructor",

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredientConstructor",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  dragRef(drop(ref));

  return (
    <li className={styles.item} ref={ref}>
      <DragIcon type="primary"></DragIcon>
      <ConstructorElement
        type={el.type}
        isLocked={el.isLocked}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        extraClass="ml-2"
        handleClose={() => {
          onDelete(el.uniqueId);
        }}
      />
    </li>
  );
}

export default ConstructorIngredient;

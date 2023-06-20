import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "../../hooks";
import { useRef, FunctionComponent } from "react";
import styles from "./constructor-ingredient.module.css";
import { moveIngredient } from "../../services/actions/burger-ingredients";
import { TIngredient } from "../../types";

interface IConstructorIngredient {
  el: TIngredient;
  onDelete: (el: TIngredient) => void;
  index: number;
}

interface IDropItem {
  id:string;
  index:number;
}

const ConstructorIngredient: FunctionComponent<IConstructorIngredient> = ({
  el,
  onDelete,
  index,
}) => {
  const id = el._id;
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop<IDropItem>({
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
      let hoverClientY: number | undefined;
      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverRect.top;
      }

      if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMidY)
        return;
      if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMidY)
        return;

      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [, dragRef] = useDrag({
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
        // type={el.type}
        isLocked={el.isLocked}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        extraClass="ml-2"
        handleClose={() => {
          onDelete(el);
        }}
      />
    </li>
  );
};

export default ConstructorIngredient;

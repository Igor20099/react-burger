import styles from "./feed-order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";


function FeedOrder({ el, ingredients, handleOpenModal}) {
  function getPrice(elementIngredients, ingredients) {
    const elements = elementIngredients.map((id) =>
      ingredients.find((el) => el._id === id)
    );
    console.log(elements);
    const totalPrice = elements.reduce(
      (acc, ingredient) => acc + ingredient?.price,
      0
    );
    return totalPrice;
  }

  return (
    <li id={el._id} key={el._id}  className={styles.order} onClick={handleOpenModal}>
      <div className={styles.wrapper}>
        <p className="text text_type_digits-default pt-6">{`#${el.number}`}</p>
        <p className="text text_type_main-default text_color_inactive pt-6">
          {<FormattedDate date={new Date(el.createdAt)} />}
        </p>
      </div>

      <p className="text text_type_main-medium p-6">{el.name}</p>
      <div className={styles.wrapper}>
        <div className={styles.icons}>
          {el.ingredients.slice(0, 5).map((id) => {
            const ingredient = ingredients.find((el) => el._id === id);
            const image = ingredient?.image_mobile;
            const name = ingredient?.name;
            return (
              <div className={styles.image_wrapper}>
                <img src={image} alt={name} className={styles.icon} />
              </div>
            );
          })}
          {el.ingredients.length > 5 ? (
            <div className={styles.number_wrapper}>
              <p
                className={`text text_type_digits-default pt-6 pl-4 ${styles.number}`}
              >
                +{el.ingredients.length - 5}
              </p>
            </div>
          ) : null}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">
            {getPrice(el.ingredients, ingredients)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default FeedOrder;

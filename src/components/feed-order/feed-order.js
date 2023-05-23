import styles from "./feed-order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { getPrice, getStatus, getStatusColor } from "../../utils/utils";
import PropTypes from "prop-types";
import {useEffect} from 'react'

function FeedOrder({ el, ingredients,uniqueId, handleOpenModal, isStatus }) {


  return (
    <li
      key={uniqueId}
      id={el._id}
      className={styles.order}
      onClick={handleOpenModal}
    >
      <div className={styles.wrapper}>
        <p className="text text_type_digits-default pt-6">{`#${el.number}`}</p>
        <p className="text text_type_main-default text_color_inactive pt-6">
          {<FormattedDate date={new Date(el.createdAt)} />}
        </p>
      </div>

      <p className="text text_type_main-medium p-6">{el.name}</p>
      {isStatus && (
        <p
          className="text text_type_main-small ml-6 pb-6"
          style={{ color: getStatusColor(getStatus(el)) }}
        >
          {getStatus(el)}
        </p>
      )}
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

FeedOrder.propTypes = {
  // el: PropTypes.shape({
  //   _id: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   proteins: PropTypes.number.isRequired,
  //   fat: PropTypes.number.isRequired,
  //   carbohydrates: PropTypes.number.isRequired,
  //   calories: PropTypes.number.isRequired,
  //   price: PropTypes.number.isRequired,
  //   image: PropTypes.string.isRequired,
  //   image_mobile: PropTypes.string.isRequired,
  //   image_large: PropTypes.string.isRequired,
  //   __v: PropTypes.number.isRequired,
  // }),
  handleOpenModal: PropTypes.func.isRequired,
  isStatus: PropTypes.bool.isRequired,
};

export default FeedOrder;

import styles from "./feed-order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { getPrice, getStatus, getStatusColor } from "../../utils/utils";
import PropTypes from "prop-types";
import { FunctionComponent } from "react";
import { useDispatch,useSelector } from '../../hooks';
import { TOrder } from "../../types";

interface IFeedOrder {
   el: TOrder;
   handleOpenModal: (e:React.SyntheticEvent) => void;
   isStatus:boolean;
   uniqueId?:string;
}

const FeedOrder:FunctionComponent<IFeedOrder> = ({ el, handleOpenModal, isStatus }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

  return (
    <li
      key={uuidv4()}
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
              <div key={uuidv4()} className={styles.image_wrapper}>
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

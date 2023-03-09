import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.details}>
      <div className={styles.ingredient}>
        <img
          className="mb-6"
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div className={styles.compound}>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive mb-2 mr-6">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </div>

          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive mb-2  mr-6">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive mb-2 mr-2">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive mb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
};

export default IngredientDetails;

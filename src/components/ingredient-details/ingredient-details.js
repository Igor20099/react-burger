import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredient } from "../../services/actions/ingredient-details";
import { useNavigate } from "react-router-dom";

function IngredientDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams()

  const { ingredients } = useSelector((state) => state.ingredients);
  const { ingredient } = useSelector((state) => state.ingredientDetails);
  
  useEffect(() => {
    ingredients.find((el) => {
      if (id === el._id) {
        dispatch(getIngredient(el));
      }
    });
  }, [ingredients, id]);

  return (
    <div className={styles.details}>
      {ingredient && (
        <div className={styles.ingredient}>
          <img
            className="mb-8"
            src={ingredient.image_large}
            alt={ingredient.name}
          />
          <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
          <div className={styles.compound}>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive mb-2 mr-6">
                Калории,ккал
              </p>
              <p className="text text_type_digits-default text_color_inactive mb-2 mr-6">
                {ingredient.proteins}
              </p>
            </div>

            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive mb-2  mr-6">
                Белки, г
              </p>
              <p className="text text_type_digits-default text_color_inactive mb-2  mr-6">
                {ingredient.calories}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive mb-2 ml-4">
                Жиры, г
              </p>
              <p className="text text_type_digits-default text_color_inactive mb-2 ml-4">
                {ingredient.fat}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive mb-2 ml-6">
                Углеводы, г
              </p>
              <p className="text text_type_digits-default text_color_inactive mb-2 ml-6">
                {ingredient.carbohydrates}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IngredientDetails;

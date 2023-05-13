import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";

function IngredientDetails() {
  let { ingredient } = useSelector((state) => state.ingredientDetails);
  if (ingredient) {
    localStorage.setItem("ingredient", JSON.stringify(ingredient));
  } else {
    ingredient = JSON.parse(localStorage.getItem("ingredient"));
    localStorage.setItem("isModal", JSON.stringify(false));
  }
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className={styles.details}>
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
    </div>
  );
}

export default IngredientDetails;

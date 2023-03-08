import styles from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.details}>
      <h2 className="text text_type_main-large mr-10 mt-10 ml-10">
        Детали ингредиента
      </h2>
      <div className={styles.ingredient}>
        <img  className="mb-4" src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div className={styles.compound}>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
          </div>

          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
          </div>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
          </div>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;

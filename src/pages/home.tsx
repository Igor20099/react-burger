import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import PropTypes from "prop-types";

function HomePage({ setIsModal }) {
  return (
    <div className={styles.app}>
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients setIsModal={setIsModal} />
          <BurgerConstructor setIsModal={setIsModal} />
        </DndProvider>
      </main>
    </div>
  );
}

HomePage.propTypes = {
  setIsModal:PropTypes.func
};

export default HomePage;

import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { addIngredient } from '../../services/actions/burger-ingredients';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const dispatch = useDispatch()

const handleDrop = (ingredient: object) => {
  dispatch(addIngredient(ingredient,uuidv4()))
}

  return (
    <div className={styles.app} >
      <AppHeader />
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
      </main>  
    </div>
  );
}

export default App;

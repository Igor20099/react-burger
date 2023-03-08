import React from 'react';
import logo from './logo.svg';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {data} from '../../utils/data.js'
import {ingredients} from '../../utils/ingredients';

function App() {
 
  return (
    <div className={styles.app} >
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor ingredients={ingredients}/>
      </main>
    </div>
  );
}

export default App;

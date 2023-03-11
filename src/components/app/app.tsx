import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {ingredients} from '../../utils/ingredients';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients'
  const [data,setData] = React.useState([])
  React.useEffect(() => {
      fetch(URL).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }).then(res => setData(res.data)).catch((err) => {
        console.log(err);
      })
  }, [])
 
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

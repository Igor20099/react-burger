import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DataContext } from '../../services/dataContext';
import { OrderContext } from '../../services/orderContext';
import { SetOrderContext } from '../../services/setOrderContext';


function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients'
  const [data,setData] = React.useState([])
  const [order,setOrder] = React.useState({})
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
       
        <DataContext.Provider value={ data }>
          <BurgerIngredients />
          <OrderContext.Provider value={order}>
          <SetOrderContext.Provider value={setOrder}>
            <BurgerConstructor />
          </SetOrderContext.Provider>
          </OrderContext.Provider>
        </DataContext.Provider>
      </main>
      
    </div>
  );
}

export default App;

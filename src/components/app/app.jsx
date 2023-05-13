import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import {HomePage , LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404, ProfilePage, OrdersPage} from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'
import { login } from "../../services/actions/auth";
import { getIngredients } from '../../services/actions/ingredients';
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import {useState} from 'react'
import { deleteIngredient } from '../../services/actions/ingredient-details';
import { useSelector } from 'react-redux';



function App() {
  function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
    let [isModal, setIsModal] = useState(false);
    useEffect(() =>{
      setIsModal(JSON.parse(localStorage.getItem('isModal')))
    },[])
    const handleCloseModal = () => {
      setIsModal(false)
      localStorage.setItem('isModal', JSON.stringify(false))
    };
  
    return (
      <div>
        <Routes location={background || location}>
       <Route path='/' element={<HomePage setIsModal ={setIsModal}/>} />
       <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
       <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage/>}/>} />
       {!isModal && <Route path="/ingredients/:id" element={<IngredientDetails />} />}
       {isModal && <Route path='/ingredients/:id' element={<HomePage />}/>}
  
       <Route path='/login' element={<LoginPage />} />
       <Route path='/register' element={<RegisterPage />} />
       <Route path='/forgot-password' element={<ForgotPasswordPage />} />
       <Route path='/reset-password' element={<ResetPasswordPage />} />
       <Route path="*" element={<NotFound404 />}/>   
    </Routes>
   
      </div>
    );
  }
  
  return (
    <BrowserRouter>
     <AppHeader />
     <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;

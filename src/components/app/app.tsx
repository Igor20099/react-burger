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


function App() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
     <AppHeader />
     <Routes>
       <Route path='/' element={<HomePage />} />
       <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
       <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage/>}/>} />
       <Route path="/ingredients/:id" element={<HomePage />} />
  
       <Route path='/login' element={<LoginPage />} />
       <Route path='/register' element={<RegisterPage />} />
       <Route path='/forgot-password' element={<ForgotPasswordPage />} />
       <Route path='/reset-password' element={<ResetPasswordPage />} />
       <Route path="*" element={<NotFound404 />}/>
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;

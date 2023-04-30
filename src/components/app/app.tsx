import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import {HomePage , LoginPage, RegisterPage,ForgotPasswordPage, ResetPasswordPage} from '../../pages';


function App() {
  return (
    <BrowserRouter>
     <AppHeader />
     <Routes>
       <Route path='/' element={<HomePage />} />
       <Route path='/login' element={<LoginPage />} />
       <Route path='/register' element={<RegisterPage />} />
       <Route path='/forgot-password' element={<ForgotPasswordPage />} />
       <Route path='/reset-password' element={<ResetPasswordPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

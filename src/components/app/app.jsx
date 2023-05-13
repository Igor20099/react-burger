import AppHeader from '../app-header/app-header';
import { BrowserRouter ,Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import {HomePage , LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404, ProfilePage, OrdersPage} from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Modal from '../modal/modal';
import {useState} from 'react'



function App() {
  function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
    let [isModal, setIsModal] = useState(false);
    useEffect(() =>{
      setIsModal(localStorage.getItem('isModal'))
    },[isModal])

    function handleCloseModal() {
      setIsModal(false)  
    }

    
  
    return (
      <div>
    <Routes location= {background || location}>
       <Route path='/' element={<HomePage setIsModal ={setIsModal}/>} />
       <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
       <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage/>}/>} />
       <Route path="/ingredients/:id" element={<IngredientDetails />}/>
       <Route path='/login' element={<LoginPage />} />
       <Route path='/register' element={<RegisterPage />} />
       <Route path='/forgot-password' element={<ForgotPasswordPage />} />
       <Route path='/reset-password' element={<ResetPasswordPage />} />
       <Route path="*" element={<NotFound404 />}/>   
    </Routes>
    {background && isModal &&
                (<Routes>
                        <Route path='/ingredients/:id' element={<Modal header="Детали ингредиента!" onClose={handleCloseModal} setIsModal={setIsModal}><IngredientDetails /></Modal>} />
                 </Routes>
                )}
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

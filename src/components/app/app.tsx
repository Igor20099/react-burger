import AppHeader from "../app-header/app-header";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  ProfilePage,
  OrdersPage,
  FeedPage,
} from "../../pages";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import { useState } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "../../hooks";
import { getCookie } from "../../utils/cookie";
import { tokenRequest } from "../../services/actions/auth";
import OrderInfo from "../order-info/order-info";

function App() {
  function ModalSwitch() {
    let location = useLocation();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;
    const [isModal, setIsModal] = useState<boolean>(false);
    const { isAuth } = useSelector((state) => state.auth);
    useEffect(() => {
      if (isAuth && !getCookie("token")) {
        dispatch(tokenRequest());
      }
      dispatch(getIngredients());
      setIsModal(localStorage.getItem("isModal") ? true : false);
    }, [isModal, dispatch]);

    function handleCloseModal() {
      setIsModal(false);
    }

    return (
      <div>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage setIsModal={setIsModal} />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement
                element={<OrdersPage setIsModal={setIsModal} />}
              />
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteElement
                element={<OrderInfo  />}
              />
            }
          />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feed" element={<FeedPage setIsModal={setIsModal} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        {background && isModal && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  title="Детали ингредиента"
                  onClose={handleCloseModal}
                  setIsModal={setIsModal}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal onClose={handleCloseModal} setIsModal={setIsModal}>
                  {" "}
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRouteElement
                  element={
                    <Modal onClose={handleCloseModal} setIsModal={setIsModal}>
                      {" "}
                      <OrderInfo />
                    </Modal>
                  }
                />
              }
            />
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

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export  function ProtectedRouteElement({ element, anonymous = false}) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}
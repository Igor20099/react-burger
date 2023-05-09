import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRouteElement({ element }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth ? element : <Navigate to="/login" replace />;
}

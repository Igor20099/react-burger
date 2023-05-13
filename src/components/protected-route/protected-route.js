import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export function ProtectedRouteElement({ element, anonymous = false }) {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}

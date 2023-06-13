import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from '../../hooks';
import { useLocation } from "react-router-dom";

export function ProtectedRouteElement({ element, anonymous = false }:any) {
  const {isAuth} = useSelector((state) => state.auth);

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

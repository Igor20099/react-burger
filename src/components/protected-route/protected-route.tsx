import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks";
import { useLocation, RouteProps } from "react-router-dom";
import { FunctionComponent, ReactElement } from "react";

interface IProtectedRouteElement {
  element: ReactElement;
  anonymous?: boolean;
}

export const ProtectedRouteElement: FunctionComponent<
  IProtectedRouteElement
> = ({ element, anonymous = false }) => {
  const { isAuth } = useSelector((state) => state.auth);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isAuth) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const token = Cookies.get("jwt_token");

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}

export default ProtectedRoute;
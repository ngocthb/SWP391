import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/customer/information" />;
  }

  return children;
};

export default AuthenticatedRoute;

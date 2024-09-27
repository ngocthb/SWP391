/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");
    
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return children ? children : <Outlet />;
};

export default PrivateRoute;

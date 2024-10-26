/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.setRoleReducer);

  useEffect(() => {
    if (!role.role || (requiredRole && role.role !== requiredRole)) {
      navigate("/login");
    }
  }, [role, navigate, requiredRole]);

  return children ? children : <Outlet />;
};

export default PrivateRoute;

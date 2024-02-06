import { Outlet, Navigate, useLocation } from "react-router-dom";

export const ProductController = () => {
  let location = useLocation();
  let controllerAmin = JSON.parse(localStorage.getItem("userInfo"));
  if (controllerAmin) return <Outlet />;
  else return <Navigate to="/login" state={{ from: location.pathname }} />;
};

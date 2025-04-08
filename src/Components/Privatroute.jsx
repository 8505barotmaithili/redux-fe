import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Privatroute = ({ children }) => {
  const { isauth } = useSelector((state) => state.auth);
  if (!isauth) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Privatroute;

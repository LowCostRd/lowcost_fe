import { Navigate } from "react-router-dom";

 export const RootRedirect = () => {
  const isReturningUser = localStorage.getItem("returning_user") === "true";
  return isReturningUser ? <Navigate to="/signin" replace /> : <Navigate to="/signup" replace />;
};

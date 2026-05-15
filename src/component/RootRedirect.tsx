import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const token = localStorage.getItem("access_token");
  const step = localStorage.getItem("onboarding_step");
  
  if (!token) return <Navigate to="/signin" replace />;
  
  // If logged in, send them to their current onboarding step or dashboard
  const paths: Record<string, string> = {
    "practice-identity": "/practice-identity",
    "practice-details": "/practice-details",
    "compliance-terms": "/compliance-terms",
  };

  return <Navigate to={step ? paths[step] : "/dashboard"} replace />;
};

export default RootRedirect;
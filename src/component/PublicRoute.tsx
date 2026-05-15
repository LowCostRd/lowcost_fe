
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("access_token");
  const onboardingStep = localStorage.getItem("onboarding_step");


  const isAuthenticated = token && token.trim() !== "" && token !== "undefined" && token !== "null";

  const ONBOARDING_REDIRECT: Record<string, string> = {
    "practice-identity": "/practice-identity",
    "practice-details": "/practice-details",
    "compliance-terms": "/compliance-terms",
  };

  if (isAuthenticated) {
    const targetPath =
      onboardingStep && ONBOARDING_REDIRECT[onboardingStep]
        ? ONBOARDING_REDIRECT[onboardingStep]
        : "/dashboard";

    return <Navigate to={targetPath} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
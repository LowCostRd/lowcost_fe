
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import LoadingScreen from "./LoadingScreen";

const ONBOARDING_ROUTES: Record<string, string> = {
  "verify-email": "/verify-email",
  "practice-identity": "/practice-identity",
  "practice-details": "/practice-details",
  "compliance-terms": "/compliance-terms",
};

const ONBOARDING_PATHS = [
  "/verify-email",
  "/practice-identity",
  "/practice-details",
  "/compliance-terms",
];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, onboardingStep } = useAuthStore();
  const token = localStorage.getItem("access_token");
  const { pathname } = useLocation();

  const isOnboardingPath = ONBOARDING_PATHS.includes(pathname);
  const isAppPath = !isOnboardingPath && pathname !== "/signin";

  if (isLoading) return <LoadingScreen />;

  

  // No token → send to signin
  if (!token) return <Navigate to="/signin" replace />;

  // Token exists but onboarding incomplete → redirect to correct step
  if (isAppPath && onboardingStep && onboardingStep !== "complete") {
    const redirectTo = ONBOARDING_ROUTES[onboardingStep] || "/practice-identity";
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;



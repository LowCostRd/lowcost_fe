// src/hooks/useAppReady.ts
import { useAuthStore } from "../store/AuthStore";
import type { OnboardingStep } from "../type/auth";

const token = localStorage.getItem("access_token");
const onboardingStep = localStorage.getItem("onboarding_step") as OnboardingStep | null;

if (token) {
  useAuthStore.setState({
    isAuthenticated: true,
    accessToken: token,
    onboardingStep: onboardingStep ?? "complete",
  });
}

export const useAppReady = (): boolean => true;
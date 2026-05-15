import axios, { AxiosError } from "axios";
import { create } from "zustand";
import api from "../services/AxiosInstance"; 
import type { AuthState, LoginPayload, OnboardingStep, RegisterComplianceTermsPayload, RegisterPayload, RegisterPracticeDetailsPayload, RegisterPracticeIdentityPayload, ResendOtpPayload, VerifyEmailPayload } from "../type/auth";
import type { CloudinaryPayload } from "../type/general";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiErrorResponse {
  error_message?: string;
  message?: string;
}

const handleApiError = (error: unknown, defaultMessage: string): string => {
  let message = defaultMessage;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    message =
      axiosError.response?.data?.error_message ||
      axiosError.response?.data?.message ||
      message;
  }
  return message;
};

const savedIdentity = localStorage.getItem("onboarding_practice_identity");
const savedDetails = localStorage.getItem("onboarding_practice_details");

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  accessToken: localStorage.getItem("access_token") || null,
  currentUser: null,
  isAuthenticated: false,
  isEmailVerified: false,
  onboardingStep: (localStorage.getItem("onboarding_step") as OnboardingStep) || null,

  setOnboardingStep: (step: OnboardingStep) => {
    localStorage.setItem("onboarding_step", step);
    set({ onboardingStep: step });
  },

  registrationForm: {
    full_name: "",
    email_address: "",
    role: "",
  },

  practiceIdentityForm: savedIdentity ? JSON.parse(savedIdentity) : {
    name: "",
    regNumber: "",
    country: "",
    stateValue: "",
    imageUrl: "",
    imagePublicId: "",
  },

  practiceDetailsForm: savedDetails ? JSON.parse(savedDetails) : {
    main_phone_number: "",
    website: "",
    number_of_practitioners: "",
    insurance_plans: [],
  },

  setRegistrationForm: (data) =>
    set((state) => ({
      registrationForm: { ...state.registrationForm, ...data },
    })),

  setPracticeIdentityForm: (data) => {
    set((state) => {
      const updated = { ...state.practiceIdentityForm, ...data };
      localStorage.setItem("onboarding_practice_identity", JSON.stringify(updated));
      return { practiceIdentityForm: updated };
    });
  },

  setPracticeDetailsForm: (data) => {
    set((state) => {
      const updated = { ...state.practiceDetailsForm, ...data };
      localStorage.setItem("onboarding_practice_details", JSON.stringify(updated));
      return { practiceDetailsForm: updated };
    });
  },

  register: async (data: RegisterPayload) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BASE_URL}/v1/api/register`, data);
      localStorage.setItem("registration_email", data.email_address.trim().toLowerCase());
      localStorage.setItem("onboarding_step", "verify-email");
      localStorage.setItem("returning_user", "true");
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Registration failed. Please try again."));
    }
  },

 
  verifyEmail: async (data: VerifyEmailPayload) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BASE_URL}/v1/api/verify_otp`, data);
      localStorage.setItem("onboarding_step", "practice-identity");
      set({
        isLoading: false,
        isEmailVerified: true,
        onboardingStep: "practice-identity",
      });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Email verification failed. Please try again."));
    }
  },


  resendOtp: async (data: ResendOtpPayload) => {
    set({ isLoading: true });
    try {
      await axios.patch(`${BASE_URL}/v1/api/resend_otp`, data);
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to resend OTP. Please try again."));
    }
  },

   
  login: async (data: LoginPayload) => {
  set({ isLoading: true });
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data, {
      withCredentials: true,
    });
    const { access_token, user } = response.data;

    const onboardingStep = user.onboarding_step || "complete";

    if (onboardingStep !== "complete") {
      localStorage.setItem("onboarding_step", onboardingStep);
      if (user.id) localStorage.setItem("onboarding_user_id", user.id);
      if (user.email) localStorage.setItem("registration_email", user.email);
    } else {
      localStorage.removeItem("onboarding_step");
      localStorage.removeItem("onboarding_user_id");
      localStorage.removeItem("registration_email");
    }

    localStorage.setItem("returning_user", "true");
    localStorage.setItem("access_token", access_token);

    set({
      isLoading: false,
      accessToken: access_token,
      currentUser: user,
      isAuthenticated: true,
      onboardingStep,
    });

    return true;

  } catch (error) {
    set({ isLoading: false });

  
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      const message =
        error.response?.data?.error_message ||
        error.response?.data?.message ||
        "";

      const isUnverified =
        message.toLowerCase().includes("verify") ||
        message.toLowerCase().includes("verified");

      if (isUnverified) {
       
        localStorage.setItem("registration_email", data.email.trim().toLowerCase());

        try {
          await axios.patch(`${BASE_URL}/v1/api/resend_otp`, {
            email_address: data.email.trim().toLowerCase(),
          });
        } catch (otpError) {
          console.error("Failed to resend OTP:", otpError);
        }

        return { unverified: true, email: data.email };
      }
    }

    throw new Error(handleApiError(error, "Login failed. Please check your credentials and try again."));
  }
},
  deleteImage: async (data: CloudinaryPayload) => {
    set({ isLoading: true });
    try {
      await api.post(`/v1/api/delete-image`, data);
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to delete image. Please try again."));
    }
  },

  registerPracticeIdentity: async (data: RegisterPracticeIdentityPayload) => {
    set({ isLoading: true });
    try {
      await api.post(`/v1/api/register_practice_identity`, data);
      localStorage.setItem("onboarding_step", "practice-details");
      set({ isLoading: false, onboardingStep: "practice-details" });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to register practice identity. Please try again."));
    }
  },

  
  registerPracticeDetails: async (data: RegisterPracticeDetailsPayload) => {
    set({ isLoading: true });
    try {
      await api.post(`/v1/api/register_practice_details`, data);
      localStorage.setItem("onboarding_step", "compliance-terms");
      set({ isLoading: false, onboardingStep: "compliance-terms" });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to register practice details. Please try again."));
    }
  },


  registerComplianceTerms: async (data: RegisterComplianceTermsPayload) => {
    set({ isLoading: true });
    try {
      await api.post(`/v1/api/register_compliance`, data);
      localStorage.removeItem("onboarding_step");
      localStorage.removeItem("registration_email");
      localStorage.removeItem("onboarding_user_id");
      localStorage.removeItem("onboarding_country");
      localStorage.removeItem("onboarding_practice_identity");
      localStorage.removeItem("onboarding_practice_details");
      set({ isLoading: false, onboardingStep: "complete" });
      return true;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to register compliance terms. Please try again."));
    }
  },

 
  logout: async () => {
    try {
      await api.post(`/auth/logout`);
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("onboarding_step");
      localStorage.removeItem("onboarding_user_id");
      localStorage.removeItem("registration_email");
      localStorage.removeItem("onboarding_country");
      localStorage.removeItem("onboarding_practice_identity");
      localStorage.removeItem("onboarding_practice_details");
      set({ accessToken: null, currentUser: null, isAuthenticated: false, isEmailVerified: false });
      window.location.href = "/signin";
    }
  },
}));
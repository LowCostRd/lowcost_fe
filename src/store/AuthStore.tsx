import axios, { AxiosError } from "axios";
import { create } from "zustand";
import type { AuthState, RegisterComplianceTermsPayload, RegisterPayload, RegisterPracticeDetailsPayload, RegisterPracticeIdentityPayload, ResendOtpPayload, VerifyEmailPayload } from "../type/auth";
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

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,

  registrationForm: {
    full_name: "",
    email_address: "",
    role: "",
  },
    practiceIdentityForm: {
    name: "",
    regNumber: "",
    country: "",
    stateValue: "",
    imageUrl: "",
    imagePublicId: "",
  },

  practiceDetailsForm: {
  main_phone_number: "",
  website: "",
  number_of_practitioners: "",
  insurance_plans: [],
},

setPracticeDetailsForm: (data) =>
  set((state) => ({
    practiceDetailsForm: { ...state.practiceDetailsForm, ...data },
  })),
  

  setRegistrationForm: (data) =>
    set((state) => ({
      registrationForm: { ...state.registrationForm, ...data },
    })),


  setPracticeIdentityForm: (data) => 
    set((state) => ({ 
      practiceIdentityForm: { ...state.practiceIdentityForm, ...data } 
    })),



  register: async (data: RegisterPayload) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BASE_URL}/v1/api/register`, data);
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
      set({ isLoading: false });
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

deleteImage: async (data: CloudinaryPayload) => {
    set({ isLoading: true });
    try {
      await axios.post(`${BASE_URL}/v1/api/delete-image`, data);
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
    await axios.post(
      `${BASE_URL}/v1/api/register_practice_identity`,
      data
    );

    set({ isLoading: false });

    return true;
  } catch (error) {
    set({ isLoading: false });
    throw new Error(
      handleApiError(
        error,
        "Failed to register practice identity. Please try again."
      )
    );
  }
},

registerPracticeDetails: async (data: RegisterPracticeDetailsPayload) => {
  set({ isLoading: true });
  try {
    await axios.post(
      `${BASE_URL}/v1/api/register_practice_details`,
      data
    );

    set({ isLoading: false });

    return true;
  } catch (error) {
    set({ isLoading: false });
    throw new Error(
      handleApiError(
        error,
        "Failed to register practice details. Please try again."
      )
    );
  }
},


registerComplianceTerms: async (data: RegisterComplianceTermsPayload) => {
  set({ isLoading: true });
  try {
    await axios.post(
      `${BASE_URL}/v1/api/register_compliance`,
      data
    );
    set({ isLoading: false });
    return true;
  } catch (error) {
    set({ isLoading: false });
    throw new Error(
      handleApiError(
        error,
        "Failed to register compliance terms. Please try again."
      )
    );
  }
},


}));


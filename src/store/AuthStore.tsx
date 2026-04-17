import axios, { AxiosError } from "axios";
import { create } from "zustand";
import type { AuthState, RegisterPayload, ResendOtpPayload, VerifyEmailPayload } from "../type/auth";

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







}));


import axios, { AxiosError } from "axios";
import { create } from "zustand";
import type { AuthState } from "../type/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiErrorResponse {
  error_message?: string;
  message?: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,

  register: async (data) => {
    set({ isLoading: true });

    try {
      await axios.post(`${BASE_URL}/v1/api/register`, data, {
        headers: { "Content-Type": "application/json" },
      });

      set({ isLoading: false });
      return true;
    } catch (error: unknown) {
      set({ isLoading: false });

      let message = "Registration failed. Please try again.";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        message =
          axiosError.response?.data?.error_message ||
          axiosError.response?.data?.message ||
          message;
      }

      throw new Error(message);
    }
  },
}));
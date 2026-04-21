import axios, { AxiosError } from "axios";
import { create } from "zustand";
import type { GetState, getUserPayload, getUserResponse } from "../type/user";


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

export const useGetStore = create<GetState>((set) => ({
  isLoading: false,

  get_user_by_email_address: async (data: getUserPayload) => {
    set({ isLoading: true });
    try {
         const response = await axios.get(
            `${BASE_URL}/v1/api/users/by-email`,
            {
                params: {
                email_address: data.email_address,
                },
            }
            );
      set({ isLoading: false });
      return response.data.message as getUserResponse;
    } catch (error) {
      set({ isLoading: false });
      throw new Error(handleApiError(error, "Failed to get user. Please try again."));
    }
  },


 


}));


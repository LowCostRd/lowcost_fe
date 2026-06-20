import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/AuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const clearStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("onboarding_step");
  localStorage.removeItem("onboarding_user_id");
  localStorage.removeItem("registration_email");
  localStorage.removeItem("onboarding_country");
  localStorage.removeItem("onboarding_practice_identity");
  localStorage.removeItem("onboarding_practice_details");

  sessionStorage.removeItem("draft_agent_id");
  sessionStorage.removeItem("draft_agent_name");
  sessionStorage.removeItem("draft_agent_specialty");
  sessionStorage.removeItem("draft_agent_voice_id");
  sessionStorage.removeItem("draft_agent_image_url");
};


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.access_token;
        localStorage.setItem("access_token", newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

       
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshError) {
     
        processQueue(refreshError, null);

  
        try {
          await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (logoutError) {
          console.error("Server logout failed:", logoutError);
        }

        clearStorage();

        useAuthStore.setState({
          accessToken: null,
          currentUser: null,
          isAuthenticated: false,
          isEmailVerified: false,
          onboardingStep: null,
        });

        toast.error("Your session has expired. Please sign in again.", {
          position: "top-right",
          autoClose: 3000,
          style: { fontSize: "16px" },
        });

        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
// ── Axios Instance ────────────────────────────────────────────────────────────

import { BASE_URL } from "@/constants/api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "bhcjobs_auth_token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request Interceptor: attach auth token ────────────────────────────────────

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore token read errors
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor: normalise errors ────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.response?.data?.error ??
      error?.message ??
      "Something went wrong.";
    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;

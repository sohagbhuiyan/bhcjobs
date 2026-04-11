// ── API Service Layer (Auth) ──────────────────────────────────────────────────
// GET data → use hooks from hooks/useApiQueries.ts (axios + tanstack-query)
// Auth mutations → use these plain async functions with useMutation

import { ENDPOINTS } from "@/constants/api";
import axiosInstance from "@/lib/axiosInstance";
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
} from "@/types/api.types";

// ── Login ─────────────────────────────────────────────────────────────────────

export async function loginJobSeeker(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const res = await axiosInstance.post<AuthResponse>(
    ENDPOINTS.JOB_SEEKER_LOGIN,
    payload,
  );
  console.log("[login] RESPONSE →", JSON.stringify(res.data, null, 2));
  return res.data;
}

// ── Register ──────────────────────────────────────────────────────────────────

export async function registerJobSeeker(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const res = await axiosInstance.post<AuthResponse>(
    ENDPOINTS.JOB_SEEKER_REGISTER,
    payload,
  );
  console.log("[register] RESPONSE →", JSON.stringify(res.data, null, 2));
  return res.data;
}
